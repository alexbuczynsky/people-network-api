import { GraphNode } from './graph-node';

export class Graph<T> {

  public initialized = false;

  protected nodes = new Map<T, GraphNode<T>>();

  public add(val1: T, val2: T) {
    const a = this.nodes.get(val1) || new GraphNode(val1);
    const b = this.nodes.get(val2) || new GraphNode(val2);

    this.nodes.set(val1, a.appendChild(b));
    this.nodes.set(val2, b.appendChild(a));
  }

  public get(val: T) {
    return this.nodes.get(val);
  }

  /**
   * Calculate degrees of seperation
   * between two nodes in the graph
   * network
   *
   * @param {T} val
   * @returns -1 if start or end node does not exist
   * @memberof GraphNode
   */
  public calculateDOS(startVal: T, endVal: T): number {
    const dos = this.internalCalculateDOS(startVal, endVal);

    // reset the graph for the next search
    this.resetGraph();
    return dos;
  }

  private internalCalculateDOS(startVal: T, endVal: T): number {

    let startNode = this.get(startVal);
    let endNode = this.get(endVal);

    if (!startNode || !endNode) {
      return -1;
    }

    startNode.distance = 0;
    endNode.distance = 1;
    // startNode.distance = endNode.distance = 1;
    startNode.visitedBegin = true;
    endNode.visitedEnd = true;

    const beginQue = [startNode];
    const endQue = [endNode];

    while (beginQue.length || endQue.length) {
      startNode = beginQue.shift();
      endNode = endQue.shift();

      if (startNode === undefined || endNode === undefined) {
        break;
      }

      for (const child of startNode.children) {

        if (child.visitedEnd) {
          return startNode.distance + child.distance;
        } else if (!child.visitedBegin) {
          child.distance = startNode.distance + 1;
          child.visitedBegin = true;
          beginQue.push(child);
        }

      }

      for (const child of endNode.children) {

        if (child.visitedBegin) {
          return endNode.distance + child.distance;
        } else if (!child.visitedEnd) {
          child.distance = endNode.distance + 1;
          child.visitedEnd = true;
          endQue.push(child);
        }

      }
    }

    return 0;
  }

  /**
   * Resets all search nodes back to default values
   *
   * @protected
   * @memberof Graph
   */
  protected resetGraph(): void {
    this.nodes.forEach((node, id) => {
      node.reset();
    });
  }

}
