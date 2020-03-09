import './index.scss';
import scrollTpl from './tpl/scroll.tpl';
import itemTpl from './tpl/item.tpl';
import reg from '../../utils/tools';

export default () => {
    return {
        name: 'nav',
        tpl (data) {
            let sWidth = (data.length * 6) + 'rem';
            let scrollStr = '',
                itemStr = '';

            scrollStr += scrollTpl().replace (reg.tplReplace (), sWidth);
            data.forEach ((item, index) => {
                itemStr += itemTpl().replace (reg.tplReplace (), (node, key) => {
                    return {
                        isCurrent: index === 0 ? 'active': '',
                        type: item.type,
                        item: item.chs
                    }[key];
                });
            });
            return {
                scrollStr,
                itemStr
            }
        }
    }
}