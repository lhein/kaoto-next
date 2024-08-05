import {
  DefaultGroup,
  GraphElement,
  Layer,
  isNode,
  observer,
  withContextMenu,
  withSelection,
} from '@patternfly/react-topology';
import { FunctionComponent } from 'react';
import { CanvasDefaults } from '../../Canvas/canvas.defaults';
import { CanvasNode } from '../../Canvas/canvas.models';
import { NodeContextMenuFn } from '../NodeContextMenu';
import './CustomGroup.scss';
import { CustomGroupCollapsible } from './CustomGroupCollapsible';

type IDefaultGroup = Parameters<typeof DefaultGroup>[0];
interface ICustomGroup extends IDefaultGroup {
  element: GraphElement<CanvasNode, CanvasNode['data']>;
}

const CustomGroup: FunctionComponent<ICustomGroup> = observer(({ element, ...rest }) => {
  const vizNode = element.getData()?.vizNode;
  const label = vizNode?.getNodeLabel();

  if (!isNode(element)) {
    throw new Error('DefaultGroup must be used only on Node elements');
  }

  return (
    <g>
      <Layer>
        <CustomGroupCollapsible
          {...rest}
          element={element}
          className="custom-group"
          label={label}
          collapsible
          collapsedWidth={CanvasDefaults.DEFAULT_NODE_DIAMETER}
          collapsedHeight={CanvasDefaults.DEFAULT_NODE_DIAMETER}
          hulledOutline={false}
        />
      </Layer>
    </g>
  );
});

export const CustomGroupWithSelection = withSelection()(withContextMenu(NodeContextMenuFn)(CustomGroup));
