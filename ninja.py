import cv2 as cv
import numpy as np
import numpy as np

def create_king_head(output_path='king_head.png'):
    # A square or 2:1 ratio works best for spheres
    width, height = 1024, 512
    # Base skin tone (Light Peach/Tan)
    img = np.full((height, width, 3), (180, 210, 240), dtype=np.uint8)

    center_x = width // 2
    center_y = height // 2

    # 1. The Beard (Drawing on the bottom half)
    # A large triangle/curve for a white/gray beard
    beard_pts = np.array([
        [center_x - 200, center_y + 50], 
        [center_x + 200, center_y + 50], 
        [center_x, height]
    ], np.int32)
    cv.fillPoly(img, [beard_pts], (220, 220, 220), cv.LINE_AA)

    # 2. The Eyes
    # Placed symmetrically around the center
    eye_y = center_y - 20
    cv.circle(img, (center_x - 60, eye_y), 10, (50, 20, 20), -1) # Left
    cv.circle(img, (center_x + 60, eye_y), 10, (50, 20, 20), -1) # Right

    # 3. The Mustache
    cv.ellipse(img, (center_x, center_y + 30), (80, 20), 0, 0, 360, (200, 200, 200), -1)

    # 4. Hair (Wrapping around the sides)
    # This covers the back of the head (0-200 and 800-1024 range)
    cv.rectangle(img, (0, 0), (250, height), (200, 200, 200), -1)
    cv.rectangle(img, (width - 250, 0), (width, height), (200, 200, 200), -1)

    # 5. Blur it slightly to make it look like painted wood/fabric
    img = cv.GaussianBlur(img, (5, 5), 0)

    cv.imwrite(output_path, img)
    print(f"King head texture saved as {output_path}")

create_king_head()

def paint_ninja_texture():
    # 1. Create a dark base for the hood (100x100)
    # Using dark gray (20, 20, 20) instead of pure black for better 3D depth
    ninja = np.full((100, 100, 3), 20, dtype=np.uint8)

    # 2. Draw the face opening (Skin tone)
    # We'll make an oval-ish shape in the center-top
    center_x, center_y = 50, 45
    cv.ellipse(ninja, (center_x, center_y), (35, 20), 0, 0, 360, (180, 200, 240), -1)

    # 3. Draw the Eyes (White part)
    # Left eye
    cv.circle(ninja, (40, 42), 6, (255, 255, 255), -1)
    # Right eye
    cv.circle(ninja, (60, 42), 6, (255, 255, 255), -1)

    # 4. Draw the Pupils (Black dots) - Looking slightly sharp
    cv.circle(ninja, (42, 42), 3, (0, 0, 0), -1)
    cv.circle(ninja, (58, 42), 3, (0, 0, 0), -1)

    # 5. Add a "Headband" line
    cv.line(ninja, (15, 25), (85, 25), (100, 100, 100), 4)
    
    # 6. Add a "Ninja" label at the bottom
    font = cv.FONT_HERSHEY_SIMPLEX
    cv.putText(ninja, "NINJA", (28, 85), font, 0.5, (255, 255, 255), 1, cv.LINE_AA)

    # Save to your public folder
    cv.imwrite("ninja_texture.png", ninja)
    print("Ninja texture painted and saved!")

paint_ninja_texture()


def create_king_texture(output_path='king_robe.png'):
    # standard texture size: 1024 wide (wraps around) x 512 high
    width, height = 1024, 512
    
    # 1. Base Robe Color (Royal Purple or Deep Red)
    # BGR: (80, 0, 80) is a nice Royal Purple
    img = np.full((height, width, 3), (80, 0, 80), dtype=np.uint8)

    # 2. Add a Royal Sash (Center Front)
    # The center of the texture is at width/2 (512)
    center = width // 2
    sash_width = 120
    # A gold/yellow sash: (0, 215, 255)
    cv.rectangle(img, (center - sash_width//2, 0), 
                  (center + sash_width//2, height), (0, 190, 230), -1)

    # 3. Add Golden Trim at the Top and Bottom
    trim_thickness = 40
    # Bottom Trim
    cv.rectangle(img, (0, height - trim_thickness), 
                  (width, height), (0, 215, 255), -1)
    # Top Trim (Neckline)
    cv.rectangle(img, (0, 0), (width, trim_thickness), (0, 215, 255), -1)

    # 4. Add "Jewels" or Buttons on the Sash
    for i in range(1, 5):
        y_pos = (height // 5) * i
        cv.circle(img, (center, y_pos), 15, (255, 255, 255), -1) # White Pearl
        cv.circle(img, (center, y_pos), 18, (0, 150, 200), 2)   # Gold Outline

    # 5. Save
    cv.imwrite(output_path, img)
    print(f"King texture saved as {output_path}")

create_king_texture()