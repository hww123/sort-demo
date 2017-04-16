var arr = [8, 3, 4, 4, 3, 2, 3, 10];

var swap = function(arr, pre, target) {
    var temp = arr[pre];
    arr[pre] = arr[target];
    arr[target] = temp;
};

var bubbleSort = function(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = arr.length -1; j > i; j--) {
            if (arr[j] < arr[j - 1]) {
                swap(arr, j - 1, j);
            }
        }
    }
};

var selectSort = function(arr) {
    var minIndex;
    for (var i = 0; i < arr.length; i++) {
        minIndex = i;
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex != i) {
          swap(arr, i, minIndex);
        }
    }
};

var insertSort = function(arr) {
    var target, j ;
    for (var i = 1; i < arr.length; i++) {
        
        j = i;
        target = arr[j];
        
        while (j > 0 && target < arr[j - 1]) {
            arr[j] = arr[j-1];
            j--;
        }
        
        arr[j] = target;
    }
    
};

var quickSort = function(arrs) {

    var parition = function(arr, left, right) {
        var pivotKey = arr[left];
        var pivotPointer = left;
       
        while (left < right) {
            while (left < right && arr[right] >= pivotKey) {
                right--;
            }
            while (left < right && arr[left] <= pivotKey) {
                left++;
            }
            swap(arr, left, right);
        }
        swap(arr, pivotPointer, left);
        return left;
    }
    
    var quickSort0 = function(arr, left, right) {
        var pivotPos = parition(arr, left, right);
        if (left > right) {
            return;
        }
        quickSort0(arr, left, pivotPos-1);
        quickSort0(arr, pivotPos+1, right);
    }
    
    quickSort0(arrs, 0, arrs.length-1);
}

var heapSort = function(arr) {
    var maxHeap = function(arrs, heapSize, index) {
        var left = index * 2;
        var right = index * 2 + 1;
        
        var largest = index;
        
        if (left < heapSize && arrs[left] > arrs[index]) {
            largest = left;
        }
        
        if (right < heapSize && arr[right] > arrs[index]) {
            largest = right;
        }
        
        if (index !== largest) {
            swap(arr, index, largest);
            maxHeap(arr, heapSize, largest);
        }
    };
    var buildMaxHeap = function(arrs) {
        var half = arrs.length / 2;
        for (var i = half; i >= 0; i--) {
            maxHeap(arrs, arrs.length, i);
        }
    }
    
    buildMaxHeap(arr);
    for (var i = arr.length - 1; i >= 1; i--) {
        swap(arr, 0, i);
        maxHeap(arr, i, 0);
    }
}

var shellSort = function(arr) {
    var incremenetNum = arr.length / 2;
    while (incremenetNum >= 1) {
        for (var i = 0; i < arr.length; i++) {
            for (var j = i; j < arr.length - incremenetNum; j += incremenetNum) {
                if (arr[j] > arr[j + incremenetNum]) {
                    swap(arr, j, j + incremenetNum);
                }
            }
        }
        incremenetNum = incremenetNum / 2
    }
}


var mergeSort = function(arrs) {
    var merge = function(arr, left, right, mid) {
      
        var temp = new Array(right-left+1);
        
        var i = left;
        var j = mid + 1;
        var k = 0;
        
        while (i <= mid && j <= right) {
            if (arr[i] < arr[j]) {
              temp[k++] = arr[i++];
            } else {
              temp[k++] = arr[j++];
            }
        }
        
        while (i <= mid) {
            temp[k++] = arr[i++];
        }
        
        while (j <= right) {
            temp[k++] = arr[j++];
        }
        
        for (var n = 0; n < temp.length; n++) {
            arr[left + n] = temp[n];
        }
    };
    var mergeSort0 = function(arr, left, right) {
        
        if (left >= right) {
            return; 
        }
        var mid = Math.floor((left + right) / 2);
          mergeSort0(arr, left, mid);
          mergeSort0(arr, mid + 1, right);
          merge(arr, left, right, mid);
    };
  
    mergeSort0(arrs, 0, arrs.length);
}


var output = function(arr, sort) {
    arr.forEach(function(a) {
        console.log(a);
    });
    sort(arr);
    console.log('-----------');
    arr.forEach(function(a) {
       console.log(a);
    });
};




//output(arr, bubbleSort);
//output(arr, selectSort);
//output(arr, insertSort);
//output(arr, quickSort);
//output(arr, heapSort);
//output(arr, shellSort);
output(arr, mergeSort);