# --
python3 -m ipykernel install --user
Installed kernelspec python3 in /home/lkit/.local/share/jupyter/kernels/python3

# check execution path
import sys
print(sys.executable)

# command
jupyter notbook list

// stop server on port 8888
jupyter notebook stop 8888


# allow absolute path
```py
import os, sys
module_path = os.path.abspath(os.path.join('.'))
if module_path not in sys.path:
    sys.path.append(module_path)
```

# reload module
```py
import app.model.strategy.rsr_model as rm
import importlib 
importlib.reload(rm)
```




