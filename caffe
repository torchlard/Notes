blobs: standard array, unified memory interface; data flows through
- allow synchronization between CPU and GPU
- data: batches of images, model parameters ..

each layer: 
1. setup: initialize layer and connections
2. forward: compute output from input, send to top
3. backward: compute gradient wrt input from gradient wrt top output, send to bottom

Data Layer:
- can from LevelDB/LMDB, HDF5

Vision layer: take images as innput and produce other images
Activation/Neuron layers
Utility Layers
Loss Layers

Interface: python, matlab

=====================

Procedure:
1. convert data to caffe-format
2. write network definition
3. write solver protobuffer text
4. train with provided train_net tool



