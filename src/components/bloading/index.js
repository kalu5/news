import './index.scss';
import tpl from './index.tpl';
import reg from '../../utils/tools';

export default () => {
    return {
        name: 'bottom-loading',
        tpl (show, text) {
            return tpl().replace (reg.tplReplace (), (node, key) => {
                return {
                    showLoading: show === true ? 'load' : '',
                    text: text
                }[key];
            });
        }
    }
}