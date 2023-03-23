import AppStyle from '../scss/App.module.scss';

export function Logo() {
    return (
        <header className={AppStyle.Iam}>
            <p>Do Eat</p>
            <b>
                <div className={AppStyle.innerIam}>
                    just do!<br />
                    just do it later ??<br />
                    just do!! eat later !!<br />
                    不能逃避。<br />
                    逃げちゃだめだ!!
                </div>
            </b>
        </header>
    )
}