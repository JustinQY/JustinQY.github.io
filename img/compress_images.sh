# 获取文件大小（适用于macOS）
get_file_size() {
  local file="$1"
  stat -f%z "$file"
}

# 压缩JPEG图片到1MB以内
compress_jpeg() {
  local img="$1"
  chmod u+w "$img" # 赋予写权限
  local size
  size=$(get_file_size "$img")
  local target_size=$((1024 * 1024)) # 1MB in bytes
  local quality=85

  while [ "$size" -gt "$target_size" ] && [ "$quality" -gt 10 ]; do
    mogrify -resize 1920x1080 -quality "$quality" "$img"
    size=$(get_file_size "$img")
    quality=$((quality - 5))
  done
}

# 压缩PNG图片到1MB以内
compress_png() {
  local img="$1"
  chmod u+w "$img" # 赋予写权限
  local size
  size=$(get_file_size "$img")
  local target_size=$((1024 * 1024)) # 1MB in bytes
  local quality=80

  pngquant --force --quality=$quality "$img" --output "${img%.png}-compressed.png"
  mv "${img%.png}-compressed.png" "$img"
  size=$(get_file_size "$img")

  while [ "$size" -gt "$target_size" ] && [ "$quality" -gt 10 ]; do
    quality=$((quality - 10))
    pngquant --force --quality=$quality "$img" --output "${img%.png}-compressed.png"
    mv "${img%.png}-compressed.png" "$img"
    size=$(get_file_size "$img")
  done
}

# 批量处理JPEG图片
for img in *.jpg; do
  compress_jpeg "$img"
done

# 批量处理PNG图片
for img in *.png; do
  compress_png "$img"
done
