figma.showUI(__html__, { height: 400, width:550, title: "Rembo" });

type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };

type OptionalEditable<T> = Partial<DeepWriteable<T>>;

type Fill = OptionalEditable<Paint>;

type Bounding = Partial<{
  height: number;
  width: number;
  x: number;
  y: number;
}>


type Stroke = OptionalEditable<MinimalStrokesMixin>;

type Corners = Partial<{
  bottomLeftRadius: number;
  bottomRightRadius: number;
  topLeftRadius: number;
  topRightRadius: number;
  cornerRadius: number;
  cornerSmoothing: number;
}>

type Border = Partial<{
  stroke : Stroke;
  corners : Corners;
}>

type Layout = Partial<{
  layoutMode: String;
  counterAxisSizingMode: String;
  counterAxisAlignItems: String;
  primaryAxisAlignItems: String;
  primaryAxisSizingMode: String;

  itemSpacing: number; // applicable only if layoutMode != "NONE"
  paddingBottom: number; // applicable only if layoutMode != "NONE"
  paddingLeft: number; // applicable only if layoutMode != "NONE"
  paddingRight: number; // applicable only if layoutMode != "NONE"
  paddingTop: number; // applicable only if layoutMode != "NONE"

  layoutGrids: LayoutGrid[];
  gridStyleId: string;
  clipsContent: boolean;
  guides: Guide[];
}>

type Layer = Partial<{
  type: String;
  children: Layer[];
  bounding: Bounding;
  fills: Fill[];
  border: Border;
  layout: Layout;
  svg : SVG;
}>

interface TextProperties extends Layer {
  textAlignHorizontal: String;
  textAlignVertical: String;
  textAutoResize: String;
  paragraphIndent: number;
  paragraphSpacing: number;
  characters: String;
  fontSize: number;
  fontName: FontName;
  textDecoration: String;
  letterSpacing: LetterSpacing;
  lineHeight: LineHeight;
  textStyleId: String;
}

type Text = Partial<TextProperties>;

interface Component extends Layer {
  name: string;
}

interface ComponentSet extends Layer {
  name: string;
  children? : Partial<Component>[];
  defaultVariant?: Component
  variantGroupProperties?: { [property: string]: { values: string[] } }
}

interface SVG {
  name: string;
  bytes: Uint8Array;
  id: string;
}

const setBounding = (node: SceneNode) => {
  return {x: node.x, y: node.y, width: node.width, height: node.height};
}

const setStrokes = (node: ComponentNode |  ComponentSetNode | FrameNode | InstanceNode | LineNode | EllipseNode | PolygonNode | RectangleNode | StarNode | VectorNode | TextNode ) => {
  return {strokes: node.strokes as DeepWriteable<Paint>[], strokeWeight: node.strokeWeight, strokeAlign: node.strokeAlign, strokeJoin: node.strokeJoin, dashPattern: node.dashPattern as number[], strokeGeometry: node.strokeGeometry as DeepWriteable<VectorPath>[]} as Stroke;
}

const setFill = (node: ComponentNode | ComponentSetNode |  FrameNode | InstanceNode | LineNode | EllipseNode | PolygonNode | RectangleNode | StarNode | VectorNode | TextNode) => {
  if(node.fills !== figma.mixed){
    if(node.fills.length > 0){
        return node.fills[0] as Fill;
    }
  }
  return {};
}

const setCorners = (node: ComponentNode | FrameNode | InstanceNode | RectangleNode ) => {
  let corners : Corners = {}
      if(node.cornerRadius !== figma.mixed){
        corners.cornerRadius = node.cornerRadius;
        corners.cornerSmoothing = node.cornerSmoothing;
        corners.bottomLeftRadius = node.bottomLeftRadius;
        corners.bottomRightRadius = node.bottomRightRadius;
        corners.topLeftRadius = node.topLeftRadius;
        corners.topRightRadius = node.topRightRadius;
      } else {
        corners.bottomLeftRadius = node.bottomLeftRadius;
        corners.bottomRightRadius = node.bottomRightRadius;
        corners.topLeftRadius = node.topLeftRadius;
        corners.topRightRadius = node.topRightRadius;
      }
      return corners;
}

const setLayout = (node: ComponentNode | ComponentSetNode | FrameNode | InstanceNode) => {
      let layout : Layout = {};
      layout.layoutMode = node.layoutMode;
      layout.counterAxisSizingMode = node.counterAxisSizingMode;
      layout.counterAxisAlignItems = node.counterAxisAlignItems;
      layout.primaryAxisAlignItems = node.primaryAxisAlignItems;
      layout.primaryAxisSizingMode = node.primaryAxisSizingMode;
      layout.itemSpacing = node.itemSpacing;
      layout.paddingBottom = node.paddingBottom;
      layout.paddingLeft = node.paddingLeft;
      layout.paddingRight = node.paddingRight;
      layout.paddingTop = node.paddingTop;
      layout.layoutGrids = node.layoutGrids as LayoutGrid[];
      layout.gridStyleId = node.gridStyleId;
      layout.clipsContent = node.clipsContent;
      layout.guides = node.guides as Guide[];
      return layout;
}


const fillLayer = <T extends Layer>(node: SceneNode, layer : T) => {
  let fill : Fill = {};
  let bounding : Bounding = {};
  let stroke : Stroke = {};
  let corners : Corners = {};
  let border : Border = {};
  let layout : Layout = {};
  layer.type = node.type;
  switch(node.type) {
    case "COMPONENT":
      const component = node as ComponentNode;
      fill = setFill(component);
      bounding = setBounding(component);
      stroke = setStrokes(component);
      corners = setCorners(component);
      layout = setLayout(component);
    break;
    case "COMPONENT_SET":
      const componentSet = node as ComponentSetNode;
      fill = setFill(componentSet);
      bounding = setBounding(componentSet);
      stroke = setStrokes(componentSet);
      layout = setLayout(componentSet);
    break;
    case "GROUP":
      const group = node as GroupNode;
      bounding = setBounding(group);
    break;
    case "FRAME":
      const frame = node as FrameNode;
      fill = setFill(frame);
      bounding = setBounding(frame);
      stroke = setStrokes(frame);
      corners = setCorners(frame);
      layout = setLayout(frame);
    break;
    case "INSTANCE":
      const instance = node as InstanceNode;
      fill = setFill(instance);
      bounding = setBounding(instance);
      stroke = setStrokes(instance);
      corners = setCorners(instance);
      layout = setLayout(instance);
    break;
    case "LINE":
      const line = node as LineNode;
      fill = setFill(line);
      bounding = setBounding(line);
      stroke = setStrokes(line);
    break;
    case "ELLIPSE":
      const ellipse = node as EllipseNode;
      fill = setFill(ellipse);
      bounding = setBounding(ellipse);
      stroke = setStrokes(ellipse);
    break;
    case "POLYGON":
      const polygon = node as PolygonNode;
      fill = setFill(polygon);
      bounding = setBounding(polygon);
      stroke = setStrokes(polygon);
    break;
    case "RECTANGLE":
      const rectangle = node as RectangleNode;
      fill = setFill(rectangle);
      bounding = setBounding(rectangle);
      stroke = setStrokes(rectangle);
      corners = setCorners(rectangle);
    break;
    case "STAR":
      const star = node as StarNode;
      fill = setFill(star);
      bounding = setBounding(star);
      stroke = setStrokes(star);
    break;
    case "VECTOR":
      const vector = node as VectorNode;
      fill = setFill(vector);
      bounding = setBounding(vector);
      stroke = setStrokes(vector);
    break;
    case "TEXT":
      const text = node as TextNode;
      fill = setFill(text);
      bounding = setBounding(text);
      stroke = setStrokes(text);  
    break;
  }
  border = { stroke, corners };
  layer.fills = [fill];
  layer.bounding = bounding;
  layer.border = border;
  layer.layout = layout;
}


const turnIntoSvg = (node: LineNode | EllipseNode | PolygonNode | RectangleNode | StarNode | VectorNode) => {}

 const traverse = async (node: SceneNode) : Promise<Layer | Text | Component | ComponentSet>  => {
  switch(node.type) {
    case "COMPONENT":
      let component : Component = {name: node.name};
      fillLayer(node, component);
      component.children = await Promise.all(node.children.map(traverse));
      return component;
    case "COMPONENT_SET":
      let componentSet : ComponentSet = {name: node.name};
      componentSet.children = await Promise.all(node.children.map(traverse));
      componentSet.defaultVariant = await traverse(node.defaultVariant) as Component;
      componentSet.variantGroupProperties = node.variantGroupProperties;
      return componentSet;
    case "GROUP":
    case "FRAME":
    case "INSTANCE":
      let group : Layer = {};
      fillLayer(node, group);
      group.children = await Promise.all(node.children.map(traverse));
      return group;
    case "LINE":
    case "ELLIPSE":
    case "POLYGON":
    case "RECTANGLE":
    case "STAR":
    case "VECTOR":
      const svg : SVG = await node.exportAsync({ format: 'SVG' })
            .then((bytes: Uint8Array) => {
              let svg : SVG = {name: node.name, bytes: bytes, id: node.id};
              return svg;
            });
      let layer : Layer = {};
      layer.svg = svg;
      fillLayer(node, layer);
      return layer;
    case "TEXT":
      //Set Text Properties
      let text : Text = {};
      text.textAlignHorizontal = node.textAlignHorizontal;
      text.textAlignVertical = node.textAlignVertical;
      text.textAutoResize = node.textAutoResize;
      text.paragraphIndent = node.paragraphIndent;
      text.paragraphSpacing = node.paragraphSpacing;
      text.characters = node.characters;
      text.fontSize = node.fontSize !== figma.mixed ? node.fontSize : undefined;
      text.fontName = node.fontName !== figma.mixed ? node.fontName : undefined;  
      text.textDecoration = node.textDecoration !== figma.mixed ? node.textDecoration : undefined;
      text.letterSpacing = node.letterSpacing !== figma.mixed ? node.letterSpacing : undefined;
      text.lineHeight = node.lineHeight !== figma.mixed ? node.lineHeight : undefined;
      text.textStyleId = node.textStyleId !== figma.mixed ? node.textStyleId : undefined;
      fillLayer(node, text);
      return text;
  }
  console.log("Unsupported Node: ",node.type);
  return {};
 }


const captureFrame = async (selection: ReadonlyArray<BaseNode>) => {
  
  if(selection.length === 0) {
    figma.notify("Please select a frame");
    return
  } else if(selection.length > 1) {
    figma.notify("Please select one frame");
    return
  } 


  const node = selection[0];
  if(node.type !== "FRAME") {
    figma.notify("Please select a frame");
    return
  }

  figma.ui.postMessage({type: "LOADING"});
  const frame = node as FrameNode;
  const bytes = await frame.exportAsync();
  let layer : any = {}
  try{
    layer = await traverse(node);
  } catch(e) {
    console.error(e);
  }
  const data = {
		frameData: layer,
		imageData: bytes,
		height: frame.height,
		width: frame.width,
		name: frame.name,
	};
  figma.ui.postMessage({type: "DATA", data});
}



figma.ui.onmessage = async (msg) => {
  if (msg.type === "push-selection") {
    const selection = figma.currentPage.selection;
    await captureFrame(selection);
  } else if (msg.type === "pull-rembo-id"){
    const rembo_id = await figma.clientStorage.getAsync("rembo_id");
    if(rembo_id) {
      figma.ui.postMessage({type: "REMBO-ID", data: rembo_id});
    }
  } else if (msg.type === "set-rembo-id"){
    await figma.clientStorage.setAsync("rembo_id", msg.rembo_id);
  }


};
