
export class GraphNode<T> {

  public value: T;

  /**
   * The distance to the root node
   * @alias degree
   */
  public distance: number = 0;

  public get childCount(): number {
    return this.children.length;
  }

  public visitedBegin: boolean = false;

  public visitedEnd: boolean = false;

  public children: Array<GraphNode<T>>;

  constructor(val: T) {
    this.value = val;
    this.children = [];
  }

  public appendChild(node: GraphNode<T>) {
    this.children.push(node);
    return this;
  }

  public reset(): void {
    this.visitedBegin = false;
    this.visitedEnd = false;
    this.distance = 0;
  }
}
