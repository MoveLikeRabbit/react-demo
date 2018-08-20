import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import './confirm.less';

interface ConfirmModel {
    message: string;
    title?: string;
    callback?: () => void;
    showCancelBtn?: boolean;
    cancelText?: string;
    confirmText?: string;
}

export default function Confirm(params: ConfirmModel) {
    let confirmEle = document.getElementById('confirm-root');

    if (!confirmEle) {
        confirmEle = document.createElement('div');
        confirmEle.id = 'confirm-root';
        const app = document.getElementById('container');
        if (app) {
            app.appendChild(confirmEle);
        }
    } else {
        unmountComponentAtNode(confirmEle);
    }
    render(<ConfirmContainer
        confirmEle={confirmEle}
        message={params.message}
        callback={params.callback}
        title={params.title}
        showCancelBtn={params.showCancelBtn}
        cancelText={params.cancelText}
        confirmText={params.confirmText}
    />, confirmEle);
}

interface ConfirmContainerProps extends ConfirmModel {
    confirmEle: HTMLElement;
}

class ConfirmContainer extends React.Component<ConfirmContainerProps, {}> {
    static defaultProps = {
        callback: null,
        title: '提示',
        showCancelBtn: true,
        cancelText: '取消',
        confirmText: '确定',
        visible: true
    };

    constructor(props: ConfirmContainerProps) {
        super(props);
        this.confirm = this.confirm.bind(this);
        this.cancel = this.cancel.bind(this);
    }
    confirm() {
        const { confirmEle, callback } = this.props;
        unmountComponentAtNode(confirmEle);
        callback && callback();
    }
    cancel() {
        const { confirmEle } = this.props;
        unmountComponentAtNode(confirmEle);
    }
    render() {
        const { message, title, showCancelBtn, cancelText, confirmText } = this.props;
        return (
            <>
                <div className="confirm">
                    <div className="title">
                        {title}
                    </div>
                    <p className="content">
                        {message}
                    </p>
                    <div className="footer">
                        {showCancelBtn && <button
                            type="button"
                            onClick={this.cancel}
                            className="button-normal">{cancelText}</button>}
                        <button type="button" className="button-primary" onClick={this.confirm}>{confirmText}</button>
                    </div>
                </div>
                <div className="confirm-mask"/>
            </>
        )
    }
}