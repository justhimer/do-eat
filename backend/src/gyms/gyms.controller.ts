import { Body, Controller, Get, HttpException, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { checkPassword } from 'utils/hash';
import { GymsService } from './gyms.service';

interface GymInfoWithToken {
  id: number,
  username: string,
  franchise_id: number,
  district_id: number,
  token: string
}

@ApiTags('gyms') // to categorize in swagger
@Controller('gyms')
export class GymsController {
  constructor(
    private readonly gymsService: GymsService,
    private readonly jwtService: JwtService
  ) { }

  @Post('login')
  async usernameLogin(
    @Body('username') username: string,
    @Body('password') password: string
  ): Promise<GymInfoWithToken> {

    // check user has input username & password
    if (!username || !password) {
      throw new HttpException('Invalid Input', HttpStatus.UNAUTHORIZED);
    }

    // get user's info from userService
    let foundGym = await this.gymsService.findByUsername(username)

    // check if user exists
    if (!foundGym) {
      throw new HttpException('Invalid username', HttpStatus.UNAUTHORIZED);
    }

    // check if password matches
    let isPasswordValid = await checkPassword(
      password,
      foundGym.password
    )
    if (!isPasswordValid) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    // produce in-app token
    const payload = {
      id: foundGym.id,
      username: foundGym.username,
      name: foundGym.name,
      franchise_id: foundGym.franchise_id,
      district_id: foundGym.district_id,
    };
    const token = this.jwtService.sign(payload);

    return {
      ...payload,
      token: token
    };

  }

  @UseGuards(AuthGuard('jwt_gym'))
  @Get()
  findById(@Request() req) {
    const gymID = req.user.id;
    return this.gymsService.findById(gymID);
  }

  @Get('/users/district/all')
  async all() {
    return await this.gymsService.allGyms()
  }

  // @UseGuards(AuthGuard('jwt_gym'))
  @Post('users/district/some')
  async district(@Body() list: number[]) {
    return await this.gymsService.districtGyms(list)
  }
}

