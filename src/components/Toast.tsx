import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import './toast.less';


export default function Toast(message: string, delay: number = 2000, callback?: () => void) {
    let toastEle = document.getElementById('toast-root');

    if (!toastEle) {

        toastEle = document.createElement('div');
        const app = document.getElementById('container');
        toastEle.id = 'toast-root';
        if (app) {
            app.appendChild(toastEle);
        }
    } else {
        unmountComponentAtNode(toastEle);
    }
    render(<ToastContainer
        toastEle={toastEle}
        message={message}
        delay={delay}
        callback={callback}
    />, toastEle);
}

interface ToastContainerProps {
    toastEle: HTMLElement;
    message: string;
    delay: number;
    callback?: () => void;
}

class ToastContainer extends React.Component<ToastContainerProps, {}> {

    timer: number | undefined;

    constructor(props: ToastContainerProps) {
        super(props);

        this.timer = undefined;
    }

    cancel() {
        const { toastEle } = this.props;
        unmountComponentAtNode(toastEle);
    }

    componentDidMount() {
        const { toastEle, delay, callback } = this.props;

        this.timer = window.setTimeout(() => {
            unmountComponentAtNode(toastEle);
            callback && callback();
        }, delay);
    }

    componentWillUnmount() {
        window.clearTimeout(this.timer);
    }

    render() {
        const { message } = this.props;

        return (
            <>
                <div className="toast">
                    {message}
                </div>
                <div className="toast-mask"/>
            </>
        )
    }
}