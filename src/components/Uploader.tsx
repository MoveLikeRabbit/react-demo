import * as React from 'react';
import Toast from './Toast';

import { uploadType } from '../lib/bridge';
import { uploadImage } from '../lib/native-api';

import './uploader.less';

interface UploaderProps {
    url?: string;
    readOnly?: boolean;
    className?: string;
    label: string;
    source?: 'camera' | 'album' | 'all';
    onChange?: (url: string) => void;
}

interface UploaderState {
    url: string;
    readOnly: boolean;
    source: 'camera' | 'album' | 'all';
    previewing: boolean;
}

export default class Uploader extends React.Component<UploaderProps, UploaderState> {
    constructor(props: UploaderProps) {
        super(props);

        const initState = {
            url: props.url || '',
            source: props.source || 'all'
        };
        this.state = {
            url: '',
            readOnly: false,
            source: 'all',
            previewing: false,
            ...initState
        };

        this.chooseFile = this.chooseFile.bind(this);
        this.openPicker = this.openPicker.bind(this);
        this.closePreview = this.closePreview.bind(this);
    }

    componentWillReceiveProps(nextProps: UploaderProps) {
        if (nextProps.url !== this.props.url) {
            this.setState({
                url: nextProps.url || ''
            });
        }
    }

    chooseFile() {
        if (this.state.readOnly) {
            return false;
        }
        if (this.state.url) {
            this.setState({
                previewing: true
            });
            return false;
        }
        this.openPicker();
        return false;
    }

    openPicker() {
        const type = {
            all: uploadType.UPLOAD_ALL,
            camera: uploadType.UPLOAD_PHOTO,
            album: uploadType.UPLOAD_ALBUM
        };
        const opt = {
            type: Number(type[this.state.source])
        };
        uploadImage(opt)
            .then(res => {
                const url = res.data || res.picUrl || '';
                this.setState({ url });
                if (this.props.onChange) {
                    this.props.onChange(url);
                }
            })
            .catch(res => {
                Toast('上传失败');
            });
    }

    closePreview() {
        this.setState({ previewing: false });
    }

    render() {
        const { className, label, readOnly } = this.props;
        const { url, previewing } = this.state;
        return (
            <div className={`${className} uploader-box`}>
                <div className="uploader" onClick={this.chooseFile}>
                    <div className="alter">&#x2795;</div>
                    {url && (
                        <div className="img">
                            <img src={url} alt="" />
                        </div>
                    )}
                </div>
                <div className="label">{label}</div>
                {previewing && (
                    <div className="preview-mask">
                        <div>
                            <div className="img">
                                <img src={url} alt="" />
                            </div>
                            <br />
                            <div className="btn-conatiners">
                                <button
                                    type="button"
                                    onClick={this.closePreview}
                                >
                                    关&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;闭
                                </button>
                                {!readOnly && (
                                    <button
                                        type="button"
                                        onClick={this.openPicker}
                                    >
                                        重新上传
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
