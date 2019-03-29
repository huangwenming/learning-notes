import Vue from 'vue';

import Skeleton from '/Users/huangwenming/hwm/home/htdocs/git/learning-notes/lavas2-sample/core/Skeleton.vue';


export default new Vue({
    components: {
        
        Skeleton,
        
    },
    template: `
        <div>
            
            <skeleton id="skeleton" style="display:none"/>
            
        </div>
    `
});
