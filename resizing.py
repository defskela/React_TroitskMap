import imutils
import cv2

orig_jpgmax = cv2.imread("jpgmax.jpg")
resized = imutils.resize(orig_jpgmax, width=16000, height=9000)
cv2.imwrite("jpgmax_resized.jpg", resized)
print(resized)
