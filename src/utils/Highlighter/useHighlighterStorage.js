import {DEBUG} from "./config.js";


class HighlighterStorage {
    highlights = []
    constructor() {
        DEBUG && console.log("DEBUG Mode")
        DEBUG && this.addDebugData()
    }
    addDebugData(){
        this.highlights.push({
            uid:'test-uid-1',
            startContainer: {
                id: '1',
            },
            endContainer: {
                id: '2'
            },
            label: 'person'
        })
        this.highlights.push({
            uid:'test-uid-2',
            startContainer: {
                id: '3',
            },
            endContainer: {
                id: '4'
            },
            label: 'car'
        })
        this.highlights.push({
            uid:'test-uid-3',
            startContainer: {
                id: '5',
            },
            endContainer: {
                id: '5'
            },
            label: 'cat'
        })
    }
    addHighlight(uid, startId, endId, label) {
        this.highlights.push({
            uid: uid,
            startContainer: {
                id: startId
            },
            endContainer: {
                id: endId
            },
            label
        })
        DEBUG && console.log('addHighlight', this.highlights)
    }

    removeHighlight(uid) {
        const tagToRemove = this.highlights.findIndex(value => {
            return value.uid === uid
        })
        if (tagToRemove < 0) {
            console.warn('未能找到高亮记录！')
        }
        this.highlights.splice(tagToRemove, 1)
        DEBUG && console.log('removeHighlight', this.highlights)
    }
}


export default HighlighterStorage;