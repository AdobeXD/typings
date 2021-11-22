import './application';
import './assets';
import './clipboard';
import './cloud';
import './commands';
import './interactions';
import './scenegraph';
import './uxp';
import './viewport';

declare global {
    function require(path: string): any;
}
