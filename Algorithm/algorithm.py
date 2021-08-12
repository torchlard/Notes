# 3-sum : choose 3 numbers such that sum = 0

def fn2(nums):
    nums.sort()
    n = len(nums)
    sol = []
    for i in range(0,n):
        if i>0 and nums[i] == nums[i-1]:
            continue
        left=i+1
        right=n-1
        temp_target = -nums[i]

        while left < right :
            left_right_sum=nums[left]+ nums[right]
            if left_right_sum > temp_target:
                right -= 1
            elif left_right_sum < temp_target:
                left += 1
            else:
                arr=[nums[i], nums[left], nums[right]]
                sol.append(arr)
                
                while left<right and nums[left]==arr[1]: 
                    left+=1
                while left<right and nums[right]==arr[2]: 
                    right-=1
        
    return sol


# 3-sum closest
import math

nums = [-1,0,1,2,-1,-4]

def fn2(nums, target):
    nums.sort()
    n = len(nums)
    sol = None
    diff = math.inf
    for i in range(0,n):
        if i>0 and nums[i] == nums[i-1]:
            continue
        left=i+1
        right=n-1

        while left < right :
            left_right_sum = nums[left]+ nums[right]
            new_diff = abs(nums[i] + left_right_sum - target)

            if new_diff < diff:
                sol = nums[left] + nums[right] + nums[i]
                diff = new_diff
            
            if new_diff == 0:
                return sol

            if left_right_sum + nums[i] > target:
                right -= 1

            elif left_right_sum + nums[i] < target:
                left += 1
                
        
    return sol

fn2(nums,-2)










