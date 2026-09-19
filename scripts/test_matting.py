from rembg import remove, new_session
from PIL import Image

session = new_session("isnet-general-use")

img = Image.open("assets/colagem-src/Screenshot 2026-09-19 at 00.22.41.png").convert("RGB")

out = remove(
    img,
    session=session,
    alpha_matting=True,
    alpha_matting_foreground_threshold=240,
    alpha_matting_background_threshold=15,
    alpha_matting_erode_size=8,
)
out.save("/tmp/test_matting_isnet.png")
print("done isnet")

session2 = new_session("u2net")
out2 = remove(
    img,
    session=session2,
    alpha_matting=True,
    alpha_matting_foreground_threshold=240,
    alpha_matting_background_threshold=15,
    alpha_matting_erode_size=8,
)
out2.save("/tmp/test_matting_u2net.png")
print("done u2net")
