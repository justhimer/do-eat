import LogoStyle from "../scss/Logo.module.scss";

export function Logo() {
    return (
        <header className={LogoStyle.Iam}>
            <p>Do Eat</p>
            <b>
                <div className={LogoStyle.innerIam}>
                    Just do.<br />
                    Eat later.<br />
                    No escape.<br />
                    不能逃避。<br />
                    逃げちゃだめだ!!
                </div>
            </b>
        </header>
    )
}