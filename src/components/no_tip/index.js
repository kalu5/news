import './index.scss';
import tpl from './index.tpl';
import reg from '../../utils/tools';

export default () => {
    return {
        name: 'no-tip',
        tpl (text) {
            return tpl().replace (reg.tplReplace (), text)
        }
    }
}