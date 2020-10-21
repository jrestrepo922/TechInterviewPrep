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
class Node{
    constructor(value){
        this.value = value; 
        this.next = null; 
    }
}

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






/******************
* WRITE A QUICKSORT
*******************/



/***************************************************************
* PRINT BINARY TREE USING DFS(INORDER, PREORDER, POSTORDER) AND BFS
***************************************************************/





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









