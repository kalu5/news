import './index.scss';
import tpl from './index.tpl';
import reg from '../../utils/tools';

export default () => {
    return {
        name: 'collected',
        tpl (collected) {
            return tpl().replace (reg.tplReplace (), collected === true ? 'full' : 'o');
        },
        changeState (collected) {
            $ ('.collector').addClass (collected === true ? 'full' :'o')
                            .removeClass (collected === true ? 'o' :'full')
        }
    }
}