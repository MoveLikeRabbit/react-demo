import React, { ChangeEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Toast from '../components/Toast';
import { getMotherboardInfo, submitDeviceInfo } from '../service/assembling';
import { DeviceInfoReq } from '../types';
import { scanQRCode } from '../lib/native-api';
import '../style/assembling.less';

type AssemblingProps = {} & RouteComponentProps<null>;

interface AssemblingState {
    boxSN: string;   // 设备sn
    boardSN: string;  // 主板sn
    boardBrand: string;  // 主板品牌
    boardType: string;  // 主板型号
    saleLink: string;  // 购买链接

    motherboardBrands: string[];  // 主板品牌列表
    motherboardTypes: string[];   // 主板类型列表
}

type ElementsWithChangeEvent = HTMLInputElement | HTMLSelectElement;

const ERROR_MSG_MAPPING: { [key: string]: string } = {
    boxSN: '请扫描或输入设备SN码',
    boardSN: '请扫描或输入主板SN码',
    boardBrand: '请选择主板品牌',
    boardType: '请选择主板型号',
    saleLink: '请扫描购买二维码'
};

export default class Assembling extends React.Component<AssemblingProps, AssemblingState> {
    private submitting: boolean = false;  // 提交状态

    constructor(props: AssemblingProps) {
        super(props);

        this.state = {
            boxSN: '',
            boardSN: '',
            boardBrand: '',
            boardType: '',
            saleLink: '',
            motherboardBrands: [],
            motherboardTypes: []
        };

        this.handleValueChange = this.handleValueChange.bind(this);
        this.postDeviceInfo = this.postDeviceInfo.bind(this);
        this.scanCode = this.scanCode.bind(this);
    }

    componentDidMount() {
        getMotherboardInfo()
            .then(res => {
                const { data } = res;
                this.setState({
                    motherboardBrands: data.brands,
                    motherboardTypes: data.types
                })
            }).catch(err => console.log(err));
    }

    scanCode(type: string): void {
        scanQRCode().then(res => {
            this.setState({
                [type as any]: res.content
            });
        }).catch(res => {
            if (res === 'fail') {
                Toast('扫码失败，请重试');
            }
        });
    }

    handleValueChange(e: ChangeEvent<ElementsWithChangeEvent>): void {
        const name = e.target.name,
            value = e.target.value;

        // There is a bug in typescript,
        // refers to https://github.com/Microsoft/TypeScript/issues/13948, maybe fixed in v3.0.
        // Using any as the workaround
        this.setState({
            [name as any]: value
        });

    }

    postDeviceInfo(): void {
        const { motherboardBrands, motherboardTypes, ...deviceInfo } = this.state;
        const postParams = deviceInfo as DeviceInfoReq;  // workaround here

        if (!this.validateForm(postParams)) {
            return;
        }

        this.submitting = true;

        submitDeviceInfo(postParams)
            .then(res => {
                this.submitting = false;
                Toast('提交成功', 1000, () => {
                    this.props.history.goBack();
                });
            }).catch(err => {
            this.submitting = false;
            Toast(err.msg);
        });
    }

    validateForm(deviceInfo: DeviceInfoReq) {
        for (const key in deviceInfo) {
            const val = deviceInfo[key];

            if (!val.trim()) {
                Toast(ERROR_MSG_MAPPING[key]);
                return false;
            }
        }

        return true;
    }

    render() {
        const {
            motherboardTypes,
            motherboardBrands,
            saleLink,
            boxSN,
            boardSN
        } = this.state;

        return (
            <main className="assembling-container">
                <p className="desc">请在改装完成后，分别录入以下信息</p>

                <form className="device-info">
                    <div className="control-group">
                        <InputControlWithScan
                            label="设备SN"
                            name="boxSN"
                            placeholder="输入或扫描"
                            onChange={this.handleValueChange}
                            value={boxSN}
                            onScanCode={this.scanCode}
                        />
                    </div>

                    <div className="control-group">
                        <SelectControl
                            label="主板品牌"
                            placeholder="请选择"
                            name="boardBrand"
                            options={motherboardBrands}
                            onChange={this.handleValueChange}
                        />

                        <SelectControl
                            label="主板型号"
                            placeholder="请选择"
                            name="boardType"
                            options={motherboardTypes}
                            onChange={this.handleValueChange}
                        />

                        <InputControlWithScan
                            label="主板SN"
                            placeholder="输入或扫描"
                            name="boardSN"
                            onChange={this.handleValueChange}
                            value={boardSN}
                            onScanCode={this.scanCode}
                        />
                    </div>

                    <div className="control-group">
                        <div className="control-item">
                            <label>购买二维码</label>
                            <div className={`sale-link ${!saleLink && 'placeholder'}`}>
                                {saleLink}
                            </div>
                            <ScanButton onScan={() => this.scanCode('saleLink')}/>
                        </div>
                    </div>

                    <div className="button-wrap">
                        <button
                            className="assembling-submit"
                            type="button"
                            onClick={this.postDeviceInfo}
                        >提交
                        </button>
                    </div>
                </form>
            </main>
        )
    }
}

/**
 * Form Controls
 */

interface ControlProps {
    label: string;
    name: string;
    placeholder: string;
    onChange: (e: ChangeEvent<ElementsWithChangeEvent>) => void;
}

interface SelectControlProps extends ControlProps {
    options: string[];
}

interface InputControlProps extends ControlProps {
    value: string;
    onScanCode: (type: string) => void;
}

interface ScanButtonProps {
    onScan: () => void;
}

function SelectControl({ label, name, placeholder, options, onChange }: SelectControlProps): JSX.Element {
    return (
        <div className="control-item">
            <label>{label}</label>
            <select name={name} onChange={onChange}>
                <option value="">{placeholder}</option>
                {
                    options.map((option, index) => {
                        return <option key={`${name}-${index}`} value={option}>{option}</option>
                    })
                }
            </select>
            <i className="arrow"/>
        </div>
    )
}

function InputControlWithScan({ label, placeholder, name, value, onChange, onScanCode }: InputControlProps) {
    return (
        <div className="control-item">
            <label>{label}</label>
            <input
                type="text"
                placeholder={placeholder}
                name={name}
                onChange={onChange}
                value={value}
            />
            <ScanButton onScan={() => onScanCode(name)}/>
        </div>
    )
}

function ScanButton({ onScan }: ScanButtonProps): JSX.Element {
    return (
        <button
            className="scan-btn"
            type="button"
            onClick={onScan}
        >扫描</button>
    )
}