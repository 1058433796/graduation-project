import uuid from "../Uid.js";
import HighlighterStorage from "./useHighlighterStorage.js";
import {ref} from "vue";
import {DEBUG, HighLightLabelStyleClass, HighLightStyleClass} from "./config.js";
import './style.css'

const highlights = new HighlighterStorage()

// 缺少选取重合判定
class Highlighter {
    constructor({
                    activeTag = 'mark',
                    isCollapsed = false,
                    rootSelector = '#text',
                    outerTag = 'span',
                    labelTag = ref('person')
                } = {}) {
        this.activeTag = activeTag
        this.isCollapsed = isCollapsed
        this.rootSelector = rootSelector
        this.outerTag = outerTag
        this.labelTag = labelTag
    }

    // 获取选中位置
    addActiveTag(that) {
        let selObj = window.getSelection();
        if (selObj.isCollapsed !== that.isCollapsed) return
        let selRange = selObj.getRangeAt(0);
        const {startContainer, endContainer} = selRange
        const begTagId = parseInt(startContainer.parentElement.id)
        const endTagId = parseInt(endContainer.parentElement.id)
        const uid = that.surroundWIthTag({begTagId, endTagId})
        DEBUG && console.log(`begTagId: ${begTagId}   endTagId: ${endTagId}`)
        highlights.addHighlight(uid, begTagId, endTagId, that.labelTag.value)
    }

    // 为选中位置添加高亮
    surroundWIthTag({
                        begTagId, endTagId,
                        uid = uuid(),
                        labelTag = this.labelTag.value
                    } = {}) {
        const tags = [...document.querySelector(this.rootSelector).children]
        const wordTag = document.createElement(this.outerTag)
        DEBUG && console.log('surroundWithTag', tags)
        wordTag.setAttribute('uid', uid)
        wordTag.addEventListener('click', (e) => {
            this.removeActiveTag(wordTag)
        })
        const targetTag = document.createElement(this.activeTag)
        targetTag.setAttribute('class', HighLightStyleClass)
        wordTag.appendChild(targetTag)
        for (let t of tags) {
            const id = parseInt(t.id)
            if (id === begTagId) {
                t.parentElement.insertBefore(wordTag, t)
            }
            if (id >= begTagId && id <= endTagId) {
                DEBUG && console.log('targetTag.append ', id)
                targetTag.appendChild(t)
            }
        }

        DEBUG && console.log(wordTag)
        const label = document.createElement('span')
        label.setAttribute('class', HighLightLabelStyleClass)
        label.innerText = labelTag
        DEBUG && console.log('labelTag', labelTag)
        targetTag.appendChild(label)
        return uid
    }

    // 取消标签的高亮
    removeActiveTag(highlightTag) {
        // 取消高亮
        // 1. 去除label tag
        // 2. all span insertBefore mark
        // 3. remove mark
        // <mark></mark>
        const markTag = highlightTag.children[0]
        // span1  span2 ... span.label
        const textSpanTags = markTag.childNodes
        // span.label
        const labelTag = textSpanTags[textSpanTags.length - 1]
        labelTag.remove()

        const markParent = markTag.parentElement
        while (textSpanTags.length > 0) {
            const child = textSpanTags[0]
            markParent.parentElement.insertBefore(child, markParent)
        }
        const uid = highlightTag.getAttribute('uid')
        highlightTag.remove()
        highlights.removeHighlight(uid)
    }

    // 从数据中恢复高亮
    addActiveTagFromStorage() {
        highlights.highlights.forEach(val => {
            DEBUG && console.log(val.label)
            this.surroundWIthTag({
                begTagId: val.startContainer.id,
                endTagId: val.endContainer.id,
                uid: val.uid,
                labelTag: val.label
            })
        })
    }

    run() {
        document.querySelector(this.rootSelector)
            .addEventListener('click', () => this.addActiveTag(this))
    }
}

export default Highlighter