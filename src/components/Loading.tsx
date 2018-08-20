import React from 'react';
import './loading.less';

export default class Loading extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
    }
    render() {
        return (
            <>
                <div className="loading">
                </div>
                <div className="loading-mask" />
            </>
        )
    }
}