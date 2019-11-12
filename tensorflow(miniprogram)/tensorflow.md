tf.slice()如何切多维度数组：https://www.jianshu.com/p/71e6ef6c121b



最简单的例子：

t = tf.constant([[[1, 1, 1], [2, 2, 2]], [[3, 3, 3], [4, 4, 4]], [[5, 5, 5], [6, 6, 6]]])

tf.slice(t, [1, 0, 0], [1, 1, 3])

这个输出是：

[[[3, 3, 3]]]

首先作为一个3维数组t，你要先明白他的shape是[3,2,3].  

Shape:
这个shape是怎么来的呢？咱们把这个t分解一下看就好理解了。那一大堆有括号的t，只看它最外面的括号的话，可以看成是：

t = [A, B, C]   #这是第一维度

然后每一个里面有两个东西，可以写成：

A = [i, j]， B = [k, l]， C = [m, n]  #这是第二维度

最后，这i, j, k, l, m, n里面分别是：

i = [1, 1, 1], j = [2, 2, 2], k = [3, 3 ,3], l = [4, 4, 4], m = [5, 5, 5], n = [6, 6, 6]  # 这是第三维度

所以shape就是中括号 [ ] 的层级里单位的数量。

对于t来说，最外面括号里有3个东西，分别是A, B, C。这三个东西每个里面有两个玩意儿, i和j, k和l, m和n。

他们里面每一个又有3个数字。所以t的shape是[3,2,3]。这是我的理解方式。

Slice:
在解释slice之前，有一点要知道的是python的数组index是从0开始的。

有了这个基础，我们再来看例子：

tf.slice(t, [1, 0, 0], [1, 1, 3])  # begin = [1, 0, 0]

这里根据顺序我们知道，begin是[1, 0, 0], size是[1, 1, 3].  他们两个数组的意义是从左至右，每一个数字代表一个维度。上面说了begin的意思是起始位置，那么[1, 0, 0]的意思是在3个维度中，每个维度从哪里算起。

第一维度是[A, B, C]。 begin里[1, 0, 0]是1，也就是从B算起。其次第二维度里B = [k, l]（注意啊，我这里只写了B = [k, l]，可不代表只有B有用，如果size里第一个数字是2的话，B和C都会被取的），begin里第二个数是0，也就是从k算起。第三维度k = [3, 3 ,3]，begin里第三个数是0，就是从第一个3算起。

到现在都能看懂吧？知道了这三个起始点之后，再来看size。

size的意思是每个维度的大小，也就是每个维度取几个元素。size的应该是最后输出的tensor的shape。

例子里面：

tf.slice(t, [1, 0, 0], [1, 1, 3])  # size = [1, 1, 3]

size里第一个是1，意思是在第一个维度取1个元素。t = [A, B, C] begin是起算是B，取一个那就是B了呗。那么第一维度结果就是[B]

size第二个也是1，第二维度B = [k, l]， begin里起算是k，取一个是k。那么第二维度结果是[[k]]。

size第三个是3,第三维度k = [3, 3 ,3]，begin里起算是第一个3。三个3取3个数，那就要把三个3都取了，所以是

[[[3, 3, 3]]]

看懂了吗？是不是有点像代数？[B]里把B换成[k]， 再把k换成[3, 3 ,3]。最后注意中括号的数量，和size一样是[1, 1, 3].