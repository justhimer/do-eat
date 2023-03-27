import Redirect from "../scss/RedirectPage.module.scss";

export function RedirectPage() {
    return (
        <div>
            <div className={Redirect.body}>
                <span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
                <div className={Redirect.base}>
                    <span></span>
                    <div className={Redirect.face}></div>
                </div>
            </div>
            <div className={Redirect.longfazers}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <h1>Redirecting</h1>
        </div>
    )
}