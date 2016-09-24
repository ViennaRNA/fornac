import '../styles/d3-context-menu.css';
import d3 from 'd3';
import slugid from 'slugid';

export function contextMenu(menu, opts) {
    let previouslyMouseUp = false;
    let clickAway = {};
    let uid = slugid.nice();

    let initialPos = null;

    var openCallback,
        closeCallback;

    if (typeof opts === 'function') {
        openCallback = opts;
    } else {
        opts = opts || {};
        openCallback = opts.onOpen;
        closeCallback = opts.onClose;
    }

    if ('pos' in opts) {
        // do we want to place this menu somewhere specific?
        initialPos = opts.pos;
    }

    // create the div element that will hold the context menu
    d3.selectAll('.d3-context-menu-' + uid).data([1])
        .enter()
        .append('div')
        .classed('d3-context-menu', true)
        .classed('d3-context-menu-' + uid, true)

    // close menu
    console.log('uid:', uid);
    d3.select('body').on('click.d3-context-menu-' + uid, function() {
        /*
        if (previouslyMouseUp) {
            previouslyMouseUp = false;
            return;
        }
        */

        d3.select('.d3-context-menu-' + uid).style('display', 'none');
        if (closeCallback) {
            closeCallback();
        }
    });

    // this gets executed when a contextmenu event occurs
    return function(data, index, pMouseUp=false,
                    clickAwayFunc = function() { } ) {
        var elm = this;
        var contextMenuPos = null;
        let mousePos = d3.mouse(this);

        clickAway = clickAwayFunc;
        let openChildMenuUid = null;

        previouslyMouseUp = pMouseUp;

        d3.selectAll('.d3-context-menu-' + uid).html('');
        var list = d3.selectAll('.d3-context-menu-' + uid)
            .on('contextmenu', function(d) {
                console.log('hiding');
                d3.select('.d3-context-menu-' + uid).style('display', 'none'); 

                d3.event.preventDefault();
                d3.event.stopPropagation();
            })
            .append('ul');

        list.selectAll('li').data(typeof menu === 'function' ? menu(data) : menu).enter()
            .append('li')
            .attr('class', function(d) {
                var ret = '';
                if (d.divider) {
                    ret += ' is-divider';
                }
                if (d.disabled) {
                    ret += ' is-disabled';
                }
                if (!d.action) {
                    ret += ' is-header';
                }
                return ret;
            })
            .html(function(d) {
                if (d.divider) {
                    return '<hr>';
                }
                if (!d.title) {
                    console.error('No title attribute set. Check the spelling of your options.');
                }
                return (typeof d.title === 'string') ? d.title : d.title(data);
            })
            .on('click', function(d, i) {
                console.log('click');
                if (d.disabled) return; // do nothing if disabled
                if (!d.action) return; // headers have no "action"
                d.action(elm, data, index, mousePos);

                // close all context menus
                d3.selectAll('.d3-context-menu').style('display', 'none');

                if (closeCallback) {
                    closeCallback();
                }
            })
            .on('mouseenter', function(d, i) {
                d3.select(this)
                    .classed('d3-context-menu-selected', true)

                if (openChildMenuUid != null) {
                    // there's a child menu open
                    if (typeof d.children == 'undefined') {
                        // no children, so hide any open child menus
                        d3.select('.d3-context-menu-' + openChildMenuUid)
                        .style('display', 'none');

                        // unselect all items
                        d3.select('.d3-context-menu-' + uid)
                            .selectAll('li')
                            .classed('d3-context-menu-selected', false);

                        openChildMenuUid = null;
                        return;
                    }

                    if (d.childUid == openChildMenuUid) {
                        // the correct child menu is already open
                        return;

                    } else {
                        // need to open a different child menu
                        
                        // close the already open one
                        d3.select('.d3-context-menu-' + openChildMenuUid)
                        .style('display', 'none');

                        openChildMenuUid = null;

                    }

                }             

                // there should be no menu open right now
                if (typeof d.children != 'undefined') {

                    let boundingRect = this.getBoundingClientRect();

                    // need to open a new menu
                    let childrenContextMenu = contextMenu(d.children, 
                                      {'pos': [ boundingRect.left + boundingRect.width,
                                                boundingRect.top - 2]});
                    d.childUid = childrenContextMenu.apply(this, [d,i,true,
                                                           function() { console.log('applying'); }]);
                    openChildMenuUid = d.childUid;
                }


                d3.select(this)
                    .classed('d3-context-menu-selected', true)
            
            })
            .on('mouseleave', function(d, i) {
                if (openChildMenuUid == null) {
                    d3.select(this)
                        .classed('d3-context-menu-selected', false);
                }
            });

        // the openCallback allows an action to fire before the menu is displayed
        // an example usage would be closing a tooltip
        if (openCallback) {
            if (openCallback(data, index) === false) {
                return uid;
            }
        }

        d3.select('.d3-context-menu-' + uid)
            .style('display', 'block');

        if (initialPos == null) {
            d3.select('.d3-context-menu-' + uid)
            .style('left', (d3.event.pageX - 2) + 'px')
            .style('top', (d3.event.pageY - 2) + 'px')
        } else {
            d3.select('.d3-context-menu-' + uid)
            .style('left', initialPos[0] + 'px')
            .style('top', initialPos[1] + 'px')
            
        }

        console.log('initalPos:', initialPos);

        // display context menu

        console.log('preventing');

        if (previouslyMouseUp)
            return uid;

        d3.event.preventDefault();
        d3.event.stopPropagation();
        //d3.event.stopImmediatePropagation();
        //
        return uid;
    };
};
