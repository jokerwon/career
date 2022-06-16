'''
多行注释
'''

# 单行注释®

3 / 4  # 0.75
# 地板除®
3 // 4  # 0

# 幂运算
2 ** 2

# 三元运算符
x, y = 4, 5
smaller = x if x < y else y
print(smaller)  # 4

# in & not in
letters = ['A', 'B', 'C']
if 'A' in letters:
    print('A' + ' exists')
if 'h' not in letters:
    print('h' + ' not exists')

# is & is not
aHello = 'hello'
bHello = 'hello'
print(aHello is bHello, aHello == bHello)  # True, True
print(aHello is not bHello, aHello != bHello)  # False, False

aHello = ['hello']
bHello = ['hello']
# is 比较的是地址，== 和 != 比较的是值本身
print(aHello is bHello, aHello == bHello)  # False, True
print(aHello is not bHello, aHello != bHello)  # True, False

