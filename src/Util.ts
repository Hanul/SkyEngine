/*
_.pull
_.clone
_.isArray
_.cloneDeep
_.isEqual
_.pull
_.times
_.union
*/
export default class Util {
    public static pull(array: any[], ...removeList: any[]) {
        for (const el of removeList) {
            const index = array.indexOf(el);
            if (index !== -1) {
                array.splice(index, 1);
            }
        }
    }
}
