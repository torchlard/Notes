# cylinder function
t = 0:pi/10:2*pi;
[x,y,z] = cylinder(2+cos(t));

z always [0,1], x=y=radius of unit cylinder according to t function

subplot(a,b,c): create spaces of axb plots, and place the plot in position c

mesh(x,y,z) draws wireframe mesh with color determined by z 
mesh(z): wireframe mesh using X=1:n, y=1:m, where [m,n]=size(z)

# imagesc(c); imagesc(x,y,c)
x = [5 8];
y = [3 6];
% the range of default color of number range [0..22] determines 12 grids' color,
    positioned from coordinate (5,3) to (8,6)
c = [0 2 4 6; 8 10 12 14; 16 18 18 22];  
imagesc(x,y,c)
eg. imagesc(I,[10,340])
colorbar
colormap gray; % turn colormap to gray

# installing "libqt4-opengl-dev" solves the problem of 
    "im_read" function not working 

#repmat 
a = [2,3]
b = repmat(a,3,2)  % repeat matrix 'a' 3 rows by 2 columns

# imread
colormap = m*3 matrix
default = jet(64)

1. image: use numbers in matrix directly as color value
2. imagesc: auto get min and max values in matrix, and map to jet(64) color space
3. imshow: default shown as gray

//===========================================

A = 1:2:8;
A = [1 3 5 7]

for i=A
for i=1:8

for i=A
    switch i
        case 3
            disp('three')
        otherwise
            disp('no')
        end
    end
end
//==========================

function y = myfunction(A)
if (i==3)
    disp('three')
else
    disp('noo')
end

//======================
A = 1:2:8;
myfunction(A)

/*** struct ***/
field='f'
value = {
    'some';
    [10 20 30];
    magic(5);
};
s = struct{field, value}
s(1).f  // "some"
s(2).f  // 10 20 30

# sqrt will produce complex number if sqrt(m) m is close to 0


