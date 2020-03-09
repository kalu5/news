import './index.scss';
import tpl from './index.tpl';
import reg from '../../utils/tools';

export default () => {
    return {
        name: 'newsHeader',
        tpl (opt) {
            return tpl().replace (reg.tplReplace (), (node, key) => {
                return {
                    title: opt.title,
                    backShow: opt.backShow === true ? 'block': 'none',
                    collectionShow: opt.collectionShow === true ? 'block': 'none'
                }[key]
            })
        }
    }
}
