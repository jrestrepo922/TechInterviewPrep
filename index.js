/*************************************
* IMPLEMENT AN ARRAYLIST FROM SCRATCH
*************************************/
// [1,2,3,4,5,6]
//  0 1 2 3 4 5

class ArrayList{
    constructor(){
        this.length = 0;
        this.data = {}; 
    }

    get(index){
        return this.data[index]
    }

    push(value){
        this.data[this.length] = value;
        this.length++; 
        return this.length;
    }

    pop(){
        let valueRemoved = this.data[this.length - 1];
        delete this.data[this.length - 1];
        this.length--;
        return valueRemoved; 
    }

    insert(index,value){
        if(index <= 0){
            index = 0;
        }
        if(index > this.length -1){
            return this.push(value);
        }
        this.data[this.length] = this.data[this.length - 1];
        this.length++;
        for(let i = this.length - 1; index <= i; i--){
            debugger
            if(i === index){
                this.data[i] = value; 
                return this.length;
            }
            this.data[i] = this.data[i - 1];
        }
    }

    delete(index){
        if(index <= 0) {
            index = 0; 
        }
        if(index > this.length - 1){
           return this.pop();
        }
        let valueRemoved = this.data[index];
        for(let i = index; i < this.length; i++){
            this.data[i] = this.data[i+1];
        }
        this.pop();
        return valueRemoved;
    
    }


}

// let myArray = new ArrayList();
// myArray.push(1)
// myArray.push(2)
// myArray.push(4)
// myArray.push(5)
// myArray.push(6)

// // myArray.pop(); 
// // console.log(myArray);
// // console.log(myArray.get(1))
// // myArray.insert(2,3)
// // myArray.delete(0)
// myArray.insert(2,3)
// console.log(myArray);



/**********************************
* CREATE AND REVERSE A LINKEND LIST
***********************************/
// class Node{
//     constructor(value){
//         this.value = value; 
//         this.next = null; 
//     }
// }

class SinglyLinkedList{
    constructor(value){
        this.head = new Node(value);
        this.tail = this.head; 
        this.length = 1; 
    }

    //adds to the end of the linked list
    append(value){
        const newNode = new Node(value); 
        // set the next property of the tail to the new created node
        this.tail.next = newNode; 
        // set the tail equals to the new node
        this.tail = newNode;
        this.length++; 
        return this; 
    }

    // adds to the begining of the linked list
    prepend(value){
        const newNode = new Node(value);
        newNode.next = this.head;
        this.head = newNode;
        this.length++
        return this; 
    }

    insert(index, value){
        // need to check if the node we are inserting is at the begining.
        if(index === 0){
            return this.prepend(value);
        }
        // need to check if node we are inserting is at the end
        if(index > this.length - 1){
            return this.append(value);
        }
        // else is not at the end or beggining
        // create a previousNode, newNode, currentNode
        const previousNode = this.transverse(index - 1)
        const newNode = new Node(value);
        const currentNode = this.transverse(index)
        // assing newNode  pointer to the currentNode; 
        newNode.next = currentNode; 
        // assing previousNode pointer to the newNode; 
        previousNode.next = newNode;
        this.length++
        return this;  

    }

    delete(index){
        //check if index is out of bounds
        if(index > this.length - 1){
            index = this.length - 1; 
        }
        if(index < 0){
            index = 0; 
        }
        // create all the nodes you will need 
        const prevNode = this.transverse(index - 1);
        const currentNode = this.transverse(index);
        const nextNode = this.transverse(index + 1);
        if(index === 0){
            currentNode.next = null; 
            this.head = nextNode;
        } else if(index === this.length -1){
            prevNode.next = null; 
            this.tail = prevNode;
        } else {
            currentNode.next = null; 
            prevNode.next = nextNode; 
        }
        this.length--
        return this;
    }

    transverse(index){
        if(index > this.length - 1){
            index = this.length -1;
        }
        let currentNode = this.head; 
        let i = 0;
        while(i < this.length){
            if(i === index) return currentNode; 
            currentNode = currentNode.next; 
            i++
        }
        return undefined; 
    }

    reverse(){
        // need to switch the tail and the head
        let tempHead = this.head;
        this.head = this.tail; 
        this.tail = tempHead; 
        // set all your lets 
        let first = this.tail; 
        let second = first.next; 
        let temp = second.next; 
        // set the first.next to null 
        first.next = null; 
        second.next = first;
        while(temp !== null){
            first = second; 
            // first.next is null currently; 
            second = temp; 
            temp = second.next;
            second.next = first; 
        }
        return this; 
    }

}

// let mySinglyLinkedList = new SinglyLinkedList(1); 
// mySinglyLinkedList.append(2);
// mySinglyLinkedList.append(3);
// mySinglyLinkedList.append(5);
// // mySinglyLinkedList.prepend(0);
// mySinglyLinkedList.insert(3, 4);
// // mySinglyLinkedList.delete(1);
// // mySinglyLinkedList.reverse();
// console.log(mySinglyLinkedList)





/**************************************************
* IMPLEMENT A HASH TABLE WITH SIMPLE HASING FUNCTION
***************************************************/
class Hash{ 
    constructor(length){
        this.data = new Array(length)
    }

    _hash(key){
        let hash = 0; 
        for(let i = 0; i < key.length; i++){
            hash = (hash + key.charCodeAt(i) * i) % this.data.length
        }
        return hash;
    }

    set(key, value){
        // create an address
        const address = this._hash(key);
        // check to see if that address does not exist and if it does not create a new address with a value of an empty array. 
        if(!this.data[address]){
            this.data[address] = [];
        }
        this.data[address].push([key,value])
        // push into the new created array. 
    }

    get(key){
        // create address to find it. 
        const address = this._hash(key);
        if(this.data[address]){
            for(let i = 0; i < this.data[address].length; i++){
                if(this.data[address][i][0] === key){
                    return this.data[address][i][1];
                }
            }
        }

        return undefined;
    }
    // TC: O(N^2)
    keys(){
        let keysArray = []; 
        for(let i = 0; i < this.data.length; i++){
            if(this.data[i]){
                for(let j = 0; j < this.data[i].length; j++){
                    keysArray.push(this.data[i][j][0])
                }
            }
        }
        return keysArray;
    }
    
}
// let myHash = new Hash(50);
// myHash.set('grapes', 20);
// myHash.set('orange', 1);
// myHash.set('strawberry', 10);
// console.log(myHash.keys())






/***************************************************************
* CREATE A GRAPH USING AN ADJANCENCY LIST AND WRITE BFS AND DFS
***************************************************************/

class Graph{
    constructor(){
        this.adjencyList = {};
        this.length = 0;
    }

    addVertex(value){
        this.adjencyList[value] = []; 
        this.length++;
        return this.length;
    }

    addEdges(vertex1, vertex2){
        if(!this.adjencyList[vertex2] || !this.adjencyList[vertex1]) return false; 
        this.adjencyList[vertex1].push(vertex2);
        this.adjencyList[vertex2].push(vertex1);
    }

    // TC: O(N^2)
    // SC: O(N)
    BFS(vertex){
        if(!this.adjencyList[vertex]) return false; 
        const list = [];
        const queue = []; 
        const visited = {}; 
        let removedVertex; 
        queue.push(vertex); 
        while(queue.length !== 0){
            removedVertex = queue.shift();
            if(!visited[removedVertex]){
                list.push(removedVertex);
                visited[removedVertex] = true; 
            }
            this.adjencyList[removedVertex].forEach(neighbor =>{
                if(!visited[neighbor]){
                    queue.push(neighbor)
                }
            })  
        }
        return list; 
    }


    DFS(vertex){
        const list = []; 
        const visited =  {}; 
        const self = this;
        function DFSHelper(currentVertex){
            if(!self.adjencyList[currentVertex]) return false; 
            if(!visited[currentVertex]){
                list.push(currentVertex);
                visited[currentVertex] = true; 
                self.adjencyList[currentVertex].forEach(neighbor => {
                    if(!visited[neighbor]){
                        DFSHelper(neighbor);
                    }
                })
            }
        }
        DFSHelper(vertex);
        return list; 

    }


}

// let myGraph = new Graph();
// myGraph.addVertex(1);
// myGraph.addVertex(2);
// myGraph.addVertex(3);
// myGraph.addVertex(4);
// myGraph.addVertex(5);
// myGraph.addEdges(1, 2);
// myGraph.addEdges(1, 3);
// myGraph.addEdges(2, 4);
// myGraph.addEdges(3, 5);
// myGraph.addEdges(4, 5);
// console.log(myGraph.DFS(1))



/********************************
* WRITE A BINARY SEARCH ALGORITHM
**********************************/
//TC: O(log(N))
//SC: O(1)
function binarySearch(sortedArray, target){
    // make sure is an array, the array is empty
    // make sure the target is an integer
    let left = 0; 
    let right = sortedArray.length - 1; 
    let middle; 
    while(left <= right){
        middle = Math.floor((right + left)/ 2)
        if(sortedArray[middle] < target){
            left = middle + 1;
        } else if(sortedArray[middle] > target){
            right = middle - 1; 
        } else {
            return true;
        }
    }
    return false; 
}


// console.log(binarySearch([0,1,2,3,4,5, 6, 7], 7))




/******************
* WRITE A MERGESORT 
*******************/
// we need a merge function that combines two sorted arrays together 
function merge(arr1, arr2){
    // make sure the values pass are arrays
    // make sure the values are not undefined 
    // make sure the values are all integers; 
    const mergeArr = []; 
    let i = 0;
    let j = 0; 
    while(i < arr1.length && j < arr2.length){  
        if(arr1[i] < arr2[j]){
            mergeArr.push(arr1[i])
            i++
        }else{
            mergeArr.push(arr2[j])
            j++
        }
    }
    while(i < arr1.length){
        mergeArr.push(arr1[i]);
        i++
    }
    while(j < arr2.length){
        mergeArr.push(arr2[j])
        j++
    }
    return mergeArr;
}

// console.log(merge([1,3,5], [2,4,6,7,8]))

function mergeSort(arr){
    if(arr.length === 1) return arr; 
    let middle = Math.floor(arr.length/ 2)
    let left = mergeSort(arr.slice(0, middle));
    let rigth = mergeSort(arr.slice(middle));
    return merge(left, rigth);
}

// console.log(mergeSort([3,2,1,4, 8 , 11, 90 , 40]))

/******************
* WRITE A QUICKSORT
*******************/
// create a pivot function
function pivot(arr, start = 0, end = arr.length - 1){
    let swapIndex = start; 
    const pivot = arr[start];
    for(let i = start + 1; i <= end; i++){
        if(pivot > arr[i]){
            swapIndex++;
            swap(arr, swapIndex, i)
        }
    }
    swap(arr, swapIndex, start);
    return swapIndex; 
}

// console.log(pivot([4,8,2,1,5]))
// create a swap function 
function swap(arr, index1, index2){
    const temp = arr[index1]; 
    arr[index1] = arr[index2]; 
    arr[index2] = temp;
}

//create quickSort
function quickSort(arr, left = 0, right = arr.length - 1){
    if(left < right){
        let pivotIndex = pivot(arr, left, right )// 2
        // left
        quickSort(arr,left, pivotIndex -1);
        // right
        quickSort(arr, pivotIndex + 1, right); 
    }
    return arr; 
}

console.log(quickSort([4,8,2,1,5]))

/***************************************************************
* PRINT BINARY TREE USING DFS(INORDER, PREORDER, POSTORDER) AND BFS
***************************************************************/
class Node{
    constructor(value){
        this.value = value, 
        this.left = null, 
        this.right = null 
    }
}









class BST{
    constructor(value){
        this.root = new Node(value)
    }

    insert(value){
        if(typeof value !== "number" || value < 0) return; 
        // create a variable that holds the currentNode. You will always start with the root
        let currentNode = this.root; 
        // we want to insert once we get to a value and its right or left property is null.
        const newNode = new Node(value)
        while(true){
            // need to check if greater or smaller than the currentNode.value
            if(value < currentNode.value ){
                if(currentNode.left === null){
                    currentNode.left = newNode;
                    return this; 
                }
                currentNode = currentNode.left; 
            } else {
                if(currentNode.right === null){
                    currentNode.right = newNode; 
                    return this; 
                }
                currentNode = currentNode.right;
            }
        } 


    }

    lookUp(value){
        if(typeof value !== "number" || value < 0) return false; 
        let currentNode = this.root; 
        while(currentNode !== null){
            if(value < currentNode.value){
                currentNode = currentNode.left;
            } else if (value > currentNode.value){
                currentNode = currentNode.right;
            } else {
                return currentNode; 
            }
        }
        return false; 
    }

    BFS(){
        const list = []; 
        const queue = []; 
        let currentNode = this.root; 
        queue.push(currentNode);
        let removedNode; 
        while(queue.length !== 0){
            removedNode = queue.shift();
            list.push(removedNode.value);
            if(removedNode.left){
                queue.push(removedNode.left);
            }
            if(removedNode.right){
                queue.push(removedNode.right)
            }
        }
        return list; 
    }

    DFSPreOrder(){
        let currentNode = this.root; 
        const list = []; 
        function DFSHelper(currentNode){
            if(currentNode === null) return;
            list.push(currentNode.value);
            DFSHelper(currentNode.left);
            DFSHelper(currentNode.right)
        }
        DFSHelper(currentNode);
        return list;
    }

    DFSInOrder(){
        let currentNode = this.root; 
        const list = []; 
        function DFSHelper(currentNode){
            if(currentNode === null) return;
            DFSHelper(currentNode.left);
            list.push(currentNode.value);
            DFSHelper(currentNode.right)
        }
        DFSHelper(currentNode);
        return list;
    }

    DFSPostOrder(){
        let currentNode = this.root; 
        const list = []; 
        function DFSHelper(currentNode){
            if(currentNode === null) return;
            DFSHelper(currentNode.left);
            
            DFSHelper(currentNode.right);
            list.push(currentNode.value);
        }
        DFSHelper(currentNode);
        return list;
    }

    
}

// let myBST = new BST(4);
// myBST.insert(3);
// myBST.insert(2);
// myBST.insert(3);
// myBST.insert(8);
// myBST.insert(7);
// console.log(myBST)
// console.log(myBST.DFSPostOrder());




/**********************************************
* IMPLEMENT A STACK AND A QUEUE USING AN ARRAY
***********************************************/

class Stack{
    constructor(){
        this.data = [];
    }

    push(value){
        this.data.push(value);
        return this;
    }

    pop(){
        this.data.pop();
    }

    peek(){
        return this.data[this.data.length - 1]
    }

    empty(){
        if(this.data.length === 0){
            return true;
        } else {
            return false; 
        }
    }
}

class Queue{
    constructor(){
        this.data = []
    }

    enqueue(value){
        this.data.push(value)
        return this; 
    }

    dequeue(){
        // Linked list would be more ideal here since shift in an array is an O(N) time complexity 
        const removedValue = this.data.shift();
        return removedValue; 
    }

    peek(){
        return this.data[0];
    }

    empty(){
        if (this.data.length === 0) {
            return true
        } else {
            return false;
        }
    }
}









