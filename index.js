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





/**************************************************
* IMPLEMENT A HASHTABLE WITH SIMPLE HASING FUNCTION
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
let myHash = new Hash(50);
myHash.set('grapes', 20);
myHash.set('orange', 1);
myHash.set('strawberry', 10);
console.log(myHash.keys())






/***************************************************************
* CREATE A GRAPH USING AN ADJANCENCY LIST AND WRITE BFS AND DFS
***************************************************************/




/********************************
* WRITE A BINARY SEARCH ALGORITHM
**********************************/








/******************
* WRITE A MERGESORT 
*******************/






/******************
* WRITE A QUICKSORT
*******************/



/***************************************************************
* PRINT BINARY TREE USING DFS(INORDER, PREORDER, POSTORDER) AND BFS
***************************************************************/





/***************************************************************
* CREATE A GRAPH USING AN ADJANCENCY LIST AND WRITE BFS AND DFS
***************************************************************/







/******************
* IMPLEMENT A TRIE
*******************/





