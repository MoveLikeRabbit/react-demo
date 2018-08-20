import React from 'react';
import { Link } from 'react-router-dom';
import '../style/entries.less';

interface EntryItem {
    name: string;
    path: string;
}
//
// const entries: EntryItem[] = [{
//     name: '物流换装',
//     path: '/rehandling/tasklist'
// }, {
//     name: '设备改装',
//     path: '/assembling'
// }, {
//     name: '设备质检',
//     path: '/qualitycheck/steps'
// }];
const entries: EntryItem[] = [{
    name: '设备质检',
    path: '/qualitycheck/steps'
}];
export default function Entries() {
    return (
        <ul className="entries">
            {
                entries.map((entry, index) => {
                    return (
                        <li key={`entry-${index}`} className="entry-item">
                            <Link to={entry.path}>{entry.name}</Link>
                        </li>
                    )
                })
            }
        </ul>
    )
}