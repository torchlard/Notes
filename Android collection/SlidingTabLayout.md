# TabColorizer 
const:
  titla_offset, tab_padding, tab_text_size
field:
  titleOffset, layoutID, TextViewID
  tabStrip, viewPager, viewPagerChangeListener

overloading:
  context
  context,attrs
  context,attrs,defStyle:
    set scroll bar, fill viewport

set colors: [ref to tabStrip]
  setCustomTabColorizer
  setSelectedIndicatorColors
  setDividerColors

implement ViewPager.onPageChangeListener
  onPageScrolled
  onPAgeScrollStateChanged
  onPageSelected

View.OnClickListener
  setCurrentItem

# SlidingTabStrip
extends LinearLayout
  all kinds of thickness and color









