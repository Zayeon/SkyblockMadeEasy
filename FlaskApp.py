from flask import Flask, request, abort, send_file
import requests
import base64
import python_nbt.nbt
import io
from PIL import Image
import json

uuidURL = "https://api.mojang.com/users/profiles/minecraft/{username}"
hypixelURL = "https://api.hypixel.net/player"
skyblockURL = "https://api.hypixel.net/skyblock/profiles"
hypixelAPI_KEY = 'b58dd8f6-4edf-42aa-a3e2-2d078f0d49a6'
minecraft_textures_URL = "http://textures.minecraft.net/texture/{}"
skin_URL = "https://crafatar.com/skins/{}"

app = Flask(__name__)

# Base leather pieces
base_helmet = Image.open("Faithful\\leather_helmet.png").convert("RGBA")
base_chestplate = Image.open("Faithful\\leather_chestplate.png").convert("RGBA")
base_leggings = Image.open("Faithful\\leather_leggings.png").convert("RGBA")
base_boots = Image.open("Faithful\\leather_boots.png").convert("RGBA")


def hypixel_stats(uuid):
    req = requests.get(hypixelURL, params={'uuid': uuid, 'key': hypixelAPI_KEY})
    return req.text


def serve_pil_image(pil_img):
    img_io = io.BytesIO()
    pil_img.save(img_io, "PNG")
    img_io.seek(0)
    return send_file(img_io, mimetype="image/PNG")


def load_image(url):
    response = requests.get(url)
    buf = io.BytesIO(response.content)
    return Image.open(buf).convert("RGBA")


@app.route('/uuid', methods=['POST'])
def uuid():
    player = request.json["player"]
    uuidURLFormatted = uuidURL.format(username=player)
    uuidReq = requests.get(uuidURLFormatted)

    return uuidReq.text


@app.route("/sbs", methods=['POST'])
def skyblock_stats():
    uuid = request.json["uuid"]

    sbsReq = requests.get(skyblockURL, params={'uuid': uuid, 'key': hypixelAPI_KEY})

    return sbsReq.text


@app.route("/decodeData", methods=["POST"])
def decode_data():
    raw = request.json["data"]
    nbtData = python_nbt.nbt.read_from_nbt_file(io.BytesIO(base64.b64decode(raw)))
    json = nbtData.json_obj(full_json=True)
    return json

@app.route("/leather/<piece>/<color>", methods=["GET"])
def leather(piece, color):
    if piece not in ["helmet", "chestplate", "leggings", "boots"]:
        abort(404)

    if piece == "helmet":
        old_data = base_helmet
    elif piece == "chestplate":
        old_data = base_chestplate
    elif piece == "leggings":
        old_data = base_leggings
    elif piece == "boots":
        old_data = base_boots


    r, g, b = color.split(":")
    new_image = Image.new("RGBA", (32, 32))

    for i in range(32):
        for j in range(32):
            if old_data.getpixel((i, j)) == (179, 179, 179, 255):
                new_image.putpixel((i, j), (int(r), int(g), int(b), 255))
            else:
                new_image.putpixel((i, j), old_data.getpixel((i, j)))

    return serve_pil_image(new_image)


@app.route("/skullB64/<b64>", methods=["GET"])
def skullB64(b64):
    decoded = base64.b64decode(b64)
    url = json.loads(decoded)["textures"]["SKIN"]["url"]
    skin = load_image(url)
    head_front = skin.crop((8, 8, 16, 16))
    head_front_overlay = skin.crop((40, 8, 48, 16))
    head_front.paste(head_front_overlay, (0, 0), head_front_overlay)
    return serve_pil_image(head_front)

@app.route("/skull/<uuid>", methods=["GET"])
def skull(uuid):
    url = minecraft_textures_URL.format(uuid)
    skin = load_image(url)
    head_front = skin.crop((8, 8, 16, 16))
    head_front_overlay = skin.crop((40, 8, 48, 16))
    head_front.paste(head_front_overlay, (0, 0), head_front_overlay)
    return serve_pil_image(head_front)

@app.route("/head/<player>", methods=["GET"])
def head(player):

    uuidURLFormatted = uuidURL.format(username=player)
    uuidReq = requests.get(uuidURLFormatted)
    uuid = uuidReq.json()["id"]

    url = skin_URL.format(uuid)
    skin = load_image(url)
    head_front = skin.crop((8, 8, 16, 16))
    head_front_overlay = skin.crop((40, 8, 48, 16))
    head_front.paste(head_front_overlay, (0, 0), head_front_overlay)
    head_front = head_front.resize((32, 32))
    return serve_pil_image(head_front)


if __name__ == "__main__":
    app.run()