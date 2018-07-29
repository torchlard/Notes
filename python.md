# clone list
import copy
a = [1,2,3]
b = copy.copy(a)

# TypeError: wait_for_event() argument after * must be an iterable, not Event
## reason
t1 = threading.Thread(name='block', target=wait_for_event, args=(e ))
<- missing ',' in args=(e, ), because python treat (e) as single object, not iterable
## solution
t1 = threading.Thread(name='block', target=wait_for_event, args=(e, ))

# if __name__=='__main__'
if run this file directly, will execute this block
if import this file, will not execute this block

# pip3: command not found but python3-pip is already installed
solution:
1. locate pip3
2. ln -s /<path>/pip3.x /usr/local/bin/pip3
