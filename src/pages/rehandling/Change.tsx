import React from 'react';
import { getCompanyInfo } from '../../service/rehandling';
import Toast from '../../components/Toast';
import { scanQRCode } from "../../lib/native-api";
import { uuidRegex } from '../../constants/variables';
import { RouteComponentProps } from "react-router";
import logger from '../../lib/log';

interface ChangeProps {
    rackId: string;
    type: string;
}

interface ChangeState {
    companyName: string;
    address: string;
}

export default class Change extends React.Component<RouteComponentProps<ChangeProps>, ChangeState> {
    rackId: number;
    type: number;

    constructor(props: RouteComponentProps<ChangeProps>) {
        super(props);
        this.rackId = Number(props.match.params.rackId);
        this.type = Number(props.match.params.type);
        this.state = {
            companyName: '',
            address: '',
        };
        this.scanCode = this.scanCode.bind(this);
    }

    componentDidMount() {
        getCompanyInfo({ rackId: this.rackId, type: this.type })
            .then(res => {
                this.setState({
                    companyName: res.data.companyName,
                    address: res.data.address
                })
            })
            .catch(err => {
                logger.error('get-companyInfo-failed', err);
                Toast(err.msg || '获取数据失败');
            })
    }

    scanCode() {
        scanQRCode().then(res => {
            if (!uuidRegex.test(res.content)) {
                Toast('这不是货架的二维码!');
                return;
            }
            const uuid = (res.content.match(uuidRegex) || [])[0];
            this.props.history.push(`/rehandling/check/${this.rackId}/${uuid}`);
        }).catch(res => {
            if (res === 'fail') {
                Toast('扫码失败，请重试');
            }
        })
    }

    render() {
        const { companyName, address } = this.state;
        return (
            <div className="change">
                <div className="block-warp content">
                    <h3>请确认公司信息和地址是否正确：</h3>
                    <p>{companyName}</p>
                    <p>{address}</p>
                    <h3>请在撤回原冰柜、安装好智能冰柜后，<br/>扫描新冰柜二维码继续</h3>
                </div>
                <div className="footer">
                    <div className="button-wrap">
                        <button type="button"
                                onClick={this.scanCode}
                                className="footer-button"
                        >扫描新冰柜二维码
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}