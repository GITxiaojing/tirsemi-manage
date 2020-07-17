import routeUtil from '@/utils/routeUtil'
import commonIcon from '_c/common-icon'
export default {
    components: {commonIcon},
    props: {
        parentItem: {
            type: Object,
            default: () => {}
        },
        iconSize: {
            type: Number,
            default: 16
        }
    },
    computed: {
        parentName () {
            return this.parentItem.name
        },
        children () {
            return this.parentItem.children
        }
    },
    methods: {
        showTitle(item) {
            return routeUtil.showTitle(item)
        },
        showChildren(item) {
            return item.children && (item.children.length > 1 || (item.meta && item.meta.showAlways))
        },
        getNameOrHref (item, isChildren) {
            return item.href ? `href_${item.href}` : (isChildren ? item.children[0].name : item.name)
        }
    }
}