/**
* Summary: HorizontalList Component 
* Description: This class extends the BaseGrid and handles the key code i.e. left,right and enter
               Must return the item view in this class in getView Method.
               This component can use by two type either extends it or Directly use as tag Element
* @author Akash Sharma
* @date  22.06.2018
*/
import React from 'react';
import VerticalItem from './GridItem'
import BaseGrid from './BaseGrid'
import KeyMap from '../../constants/keymap.constant';
import Utility from '../../commonUtilities';
class HorizontalListView extends BaseGrid {

    /**
     * Function is called from baseGrid Class and passing event
     * @param {*} event  Handling KeyCode event for Left,Right and Enter Key
     */
    handleKeyPress = (event) => {
        const keyCode = event.keyCode;
        switch (keyCode) {
            case KeyMap.VK_RIGHT:
                if (this.state.scrollIndex >= this.dataSource.length - 1) {
                    return;
                }
                this.scrollX = this.scrollX - (this.itemWidth + this.itemPadding);
                this.setState((prevState) => {
                    return { focusLostItemPosition: prevState.scrollIndex, scrollIndex: prevState.scrollIndex + 1, activeIndex: prevState.activeIndex + 1, SCROOL_SPEED: this.SCROLL_SPEED }
                }, () => {
                    this.scrollDirection = 'RIGHT';
                    this.focusChange();
                });
                break;
            case KeyMap.VK_LEFT:
                if (this.state.activeIndex === 0) {
                    return;
                }
                this.scrollX = this.scrollX + (this.itemWidth + this.itemPadding);
                this.setState((prevState) => {
                    return { focusLostItemPosition: prevState.scrollIndex, scrollIndex: prevState.scrollIndex - 1, activeIndex: prevState.activeIndex - 1, SCROOL_SPEED: this.SCROLL_SPEED }
                }, () => {
                    this.scrollDirection = 'LEFT';
                    this.focusChange();
                });
                break;
            case KeyMap.VK_ENTER:
                this.itemSelected()
                break;
            case KeyMap.VK_UP:
            case KeyMap.VK_DOWN:
                this.focusChange();
                break;
        }
    }




    /**
    * @override BaseGrid
    * Get props function call back
    */
    onFocusChange = (focusLostPosition, currentItemFocus) => {
        if (!Utility.isEmpty(this.props.onFocusChange))
            this.props.onFocusChange(focusLostPosition, currentItemFocus);
    }

    /**
      * @override BaseGrid
      * Get props function call back
      */
    onItemSelected = (position) => {
        if (!Utility.isEmpty(this.props.onItemSelected))
            this.props.onItemSelected(this.state.scrollIndex);
    }

    /**
     * Override method  Return the Item UI
     * Return the item with complete Data format
     * @param {*} position   which item is going to be render
     * @param {*} activeIndex for focus item
     * @param {*} dataObject  single object with three attribute(id,title,image)
     */
    getView = (position, activeIndex, dataObject) => {
        return (<VerticalItem key={dataObject.id} i={position} active={activeIndex} data={dataObject} />)
    }
}
export default HorizontalListView;