ps -ef | grep ***         查看进程信息
kill -9 PID                      强制停止指定进程号的进程



**删除目录、文件 rm(remove)**

功能说明：删除文件或目录。
语　　法：rm \[-dfirv]\[--help]\[--version] [文件或目录...]
补充说明：执行rm指令可删除文件或目录，如欲删除目录必须加上参数”-r”，否则预设仅会删除文件。 
参　　数：
　-d或–directory 　直接把欲删除的目录的硬连接数据删成0，删除该目录。 
　-f或–force 　强制删除文件或目录。 
　-i或–interactive 　删除既有文件或目录之前先询问用户。 
　-r或-R或–recursive 　递归处理，将指定目录下的所有文件及子目录一并处理。 
　-v或–verbose 　显示指令执行过程。 

rm  -rf  /log/access  删除 /log/access目录以及其下所有文件和子文件目录

**创建目录：mkdir(make directories)**

功能说明：建立目录 
语　　法：mkdir \[-p]\[--help]\[--version]\[-m <目录属性>] [目录名称]
补充说明：mkdir可建立目录并同时设置目录的权限。
参　　数：
  -m<目录属性>或–mode<目录属性>   建立目录时同时设置目录的权限。
  -p或–parents   若所要建立目录的上层目录目前尚未建立，则会一并建立上层目录。
例：mkdir  test

**创建文件 touch**

功能说明：改变文件或目录时间。
语　　法：touch \[-acfm]\[-d <日期时间>]\[-r <参考文件或目 录>][-t <日期时间>] [--help]　　 \[--version][文件或目录...] 或 touch \[-acfm]\[--help]\[--version]\[日期时 间][文件或目录...] 
补充说明：使用touch指令可更改文件或目录的日期时间，包括存取时间和更改时间。
参　　数：
　-a或–time=atime或–time=access或–time=use 　只更改存取时间。 
　-c或–no-create 　不建立任何文件。 
　-d<时间日期> 　使用指定的日期时间，而非现在的时间。 
　-f 　此参数将忽略不予处理，仅负责解决BSD版本touch指令的兼容性问题。 
　-m或–time=mtime或–time=modify 　只更改变动时间。 
　-r<参考文件或目录> 　把指定文件或目录的日期时间，统统设成和参考文件或目录的日期时间相同。 
　-t<日期时间> 　使用指定的日期时间，而非现在的时间。
例：touch test.txt （注：Linux下没有文件后缀名区分文件类型之说，系统文件类型只有可执行文件和不可执行文件）

**复制文件 cp(copy)**

 命令格式：cp [-adfilprsu] 源文件(source) 目标文件(destination)
              cp [option] source1 source2 source3 ...  directory
    参数说明：
    -a:是指archive的意思，也说是指复制所有的目录
    -d:若源文件为连接文件(link file)，则复制连接文件属性而非文件本身
    -f:强制(force)，若有重复或其它疑问时，不会询问用户，而强制复制
    -i:若目标文件(destination)已存在，在覆盖时会先询问是否真的操作
    -l:建立硬连接(hard link)的连接文件，而非复制文件本身
    -p:与文件的属性一起复制，而非使用默认属性
    -r:递归复制，用于目录的复制操作
    -s:复制成符号连接文件(symbolic link)，即“快捷方式”文件
    -u:若目标文件比源文件旧，更新目标文件

eg. cp direc1/file1 direc2/file2

**移动文件 mv(move)**

命令格式：mv [-fiu] source destination
    参数说明：
    -f:force，强制直接移动而不询问
    -i:若目标文件(destination)已经存在，就会询问是否覆盖
    -u:若目标文件已经存在，且源文件比较新，才会更新