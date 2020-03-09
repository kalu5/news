import './index.scss';
import tpl from './index.tpl';
import reg from '../../utils/tools';

export default () => {
    return {
        name: 'iframes',
        tpl (newsUrl) {
            return tpl().replace (reg.tplReplace (), newsUrl);
        }
    }
}