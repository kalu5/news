import './index.scss';
import tpl from './index.tpl';

export default () => {
    return {
        name: 'loading',
        tpl () {
            return tpl()
        }
    }
}