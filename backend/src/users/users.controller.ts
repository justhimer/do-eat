import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { checkPassword } from 'utils/hash';
import IncomingForm from 'formidable/Formidable';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { uploadToS3 } from 'utils/aws-s3-upload';

interface UserInfoWithToken {
  id: number,
  email: string,
  username: string,
  token: string
}

@ApiTags('users') // to categorize in swagger
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  @Post('login')
  async emailLogin(
    @Body('email') email: string,
    @Body('password') password: string
  ): Promise<UserInfoWithToken> {

    // check user has input username & password
    if (!email || !password) {
      throw new HttpException('Invalid Input', HttpStatus.UNAUTHORIZED);
    }

    // get user's info from userService
    let foundUser = await this.usersService.findByEmail(email)

    // check if user exists
    if (!foundUser) {
      throw new HttpException('Invalid email', HttpStatus.UNAUTHORIZED);
    }

    // check if password matches
    let isPasswordValid = await checkPassword(
      password,
      foundUser.password
    )
    if (!isPasswordValid) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    // produce in-app token
    const payload = {
      id: foundUser.id,
      email: foundUser.email,
      username: foundUser.username,
    };
    const token = this.jwtService.sign(payload);

    return {
      ...payload,
      token: token
    };

  }

  @Post('login/facebook')
  async facebookLogin(@Body('code') code: any): Promise<UserInfoWithToken> {

    // code should have been given by facebook to frontend
    if (!code) {
      throw new HttpException('Forbidden', HttpStatus.UNAUTHORIZED); // return status 401
    }

    // fetch facebook api using the code
    const fetchResponse = await fetch(
      `https://graph.facebook.com/oauth/access_token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: process.env.FACEBOOK_CLIENT_ID + '',
          client_secret: process.env.FACEBOOK_CLIENT_SECRET + '',
          code: code + '',
          redirect_uri: `${process.env.REACT_PUBLIC_HOSTNAME}/facebook-callback`,
        }),
      },
    );
    const data = await fetchResponse.json();

    // ensure access token is received from facebook
    if (!data.access_token) {
      throw new HttpException(
        'Failed to get access token!',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // use the access token to fetch user info, e.g. name and email
    const profileResponse = await fetch(
      `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${data.access_token}`,
    );
    const profileData = await profileResponse.json();

    // find existing user from database according to user's facebook email
    let user = await this.usersService.findByEmail(profileData.email);

    // create a new user if the user does not exist
    if (!user) {
      user = await this.usersService.createByFacebook(
        profileData.email,
        profileData.name,
      );
    }

    // produce in-app token
    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    const token = this.jwtService.sign(payload);

    return {
      ...payload,
      token: token
    };
  }

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    
    console.log(file);

    // change filename
    let fieldName = file.originalname?.split(".")[0].substring(0, file.originalname.length - 1);
    let timestamp = Date.now();
    let ext = file.mimetype?.split("/").pop();
    const fileName = `${fieldName}-${timestamp}.${ext}`;

    try {

      const accessPath = await uploadToS3({
        Bucket: 'doeat',
        Key: `${fileName}`,
        // ContentType: `${file.mimetype}`,
        Body: file.buffer
      });

      return { accessPath: accessPath }

    } catch (e) {
      throw new HttpException(`Server Error: ${e}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {

  }


  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findById(@Request() req) {
    const userID = req.user.id;
    return this.usersService.findById(userID);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/is_subscribed/')
  findIsSubscribed(@Request() req) {  // if ParseIntPipe failed, ParseIntPipe will throw a BadRequestException which shall be caught
    return this.usersService.findIsSubscribed(req.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
