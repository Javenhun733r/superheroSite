
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf({
    duration: 1500,
    position: {
        x: 'right',
        y: 'top',
    },
    types: [
        {
            type: 'warning',
            background: '#ffc107',
            icon: { className: 'notyf__icon--warning', tagName: 'i' }
        },
        {
            type: 'info',
            background: '#17a2b8',
            icon: { className: 'notyf__icon--info', tagName: 'i' }
        },
        {
            type: 'custom',
            background: '#6f42c1',
            icon: { className: 'notyf__icon--custom', tagName: 'i' }
        },
        {
            type: 'error',
            background: '#dc3545',
            icon: { className: 'notyf__icon--error', tagName: 'i' }
        }
    ]

});
export default notyf;

// export default {
//     install: (app) => {
//         app.config.globalProperties.$notyf = notyf;
//     }
// };