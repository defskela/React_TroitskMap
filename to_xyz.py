from PIL import Image
import cv2
import imutils
import os
from loguru import logger
import time
from concurrent.futures import ThreadPoolExecutor
import math

orig_img_filename = "jpgmax_resized.jpg"
orig_img_cv = cv2.imread(orig_img_filename)
TILE_SIZE = 200  # px
MIN_ZOOM = 0
MAX_ZOOM = 3
ORIG_IMG_WIDTH = 16000
ORIG_IMG_HEIGHT = 9000
OUTPUT_FOLDER = "map"


def generate_for_scale(z_scale):
    z_scale += 4
    logger.info(f"Generating Z = {z_scale - 4} ")
    start_time = time.time()
    tile_count_x = 2 ** z_scale
    logger.info(
        f"Tile count: X = {tile_count_x} Y = {tile_count_x * 9 // 16} TOTAL = {tile_count_x * tile_count_x * 9 // 16}")
    logger.info(f"Scaling image to {tile_count_x * TILE_SIZE} x {tile_count_x * 9 // 16 * TILE_SIZE}")
    scaled_image_cv = imutils.resize(orig_img_cv, width=tile_count_x * TILE_SIZE)
    scaled_image_pil = Image.fromarray(cv2.cvtColor(scaled_image_cv, cv2.COLOR_BGR2RGB))
    if scaled_image_pil.size[1] / TILE_SIZE != scaled_image_pil.size[1] // TILE_SIZE:
        scaled_height = scaled_image_pil.size[1]
        adjust_height = math.ceil(scaled_height / 200) * 200
        logger.info(f"Adjusting height from {scaled_height} to {adjust_height}")
        new_img = Image.new("RGB", (scaled_image_pil.size[0], adjust_height), (255, 255, 255))
        new_img.paste(scaled_image_pil, (0, 0))
        scaled_image_pil = new_img

    for x_i in range(0, tile_count_x):
        for y_i in range(0, tile_count_x * 9 // 16):
            tile = scaled_image_pil.crop(
                (x_i * TILE_SIZE, y_i * TILE_SIZE, (x_i + 1) * TILE_SIZE, (y_i + 1) * TILE_SIZE)
            )
            path = os.path.join(OUTPUT_FOLDER, str(z_scale - MIN_ZOOM), str(x_i))
            os.makedirs(path, exist_ok=True)
            tile.save(os.path.join(path, f"{y_i}.png"))
    logger.info(f"Generation {z_scale - 4} took {(time.time() - start_time):.2f}s")


def generate_for_scale_new(z_scale):
    logger.info(f"Generating Z = {z_scale} ")
    start_time = time.time()
    # logger.info(
    #     f"Tile count: X = {tile_count_x} Y = {tile_count_x * 9 // 16} TOTAL = {tile_count_x * tile_count_x * 9 // 16}")
    # logger.info(f"Scaling image to {tile_count_x * TILE_SIZE} x {tile_count_x * 9 // 16 * TILE_SIZE}")
    # scaled_image_cv = imutils.resize(orig_img_cv, width=tile_count_x * TILE_SIZE,
    #                                  height=tile_count_x * 9 // 16 * TILE_SIZE)
    scaled_image_pil = Image.fromarray(cv2.cvtColor(orig_img_cv, cv2.COLOR_BGR2RGB))
    for x_i in range(0, scaled_image_pil.size[0] // TILE_SIZE):
        for y_i in range(0, scaled_image_pil.size[1] // TILE_SIZE):
            tile = scaled_image_pil.crop(
                (x_i * TILE_SIZE, y_i * TILE_SIZE, (x_i + 1) * TILE_SIZE, (y_i + 1) * TILE_SIZE)
            )
            path = os.path.join(OUTPUT_FOLDER, str(z_scale), str(x_i))
            os.makedirs(path, exist_ok=True)
            tile.save(os.path.join(path, f"{y_i}.png"))
    logger.info(f"Generation {z_scale} took {(time.time() - start_time):.2f}s")


with ThreadPoolExecutor(max_workers=2) as executor:
    _ = [executor.submit(generate_for_scale, z) for z in range(MIN_ZOOM, MAX_ZOOM + 1)]
