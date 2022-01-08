// reqired packages
require('dotenv').config()

const url = process.env.APP_URL

// ffmpeg configs
module.exports = {
  options: [
    [
      '-profile:v main',
      '-b:v 350k',
      '-bufsize 350k',
      '-vcodec h264',
      '-acodec copy',
      '-vf drawtext=text="240":fontsize=100',
      '-hls_time 5',
      '-hls_flags single_file',
      '-hls_list_size 0',
      '-hls_playlist_type vod',
    `-hls_base_url ${url}/stream/`
    ], [
      '-profile:v main',
      '-b:v 700k',
      '-bufsize 700k',
      '-vcodec h264',
      '-acodec copy',
      '-vf drawtext=text="360":fontsize=100',
      '-hls_time 5',
      '-hls_flags single_file',
      '-hls_list_size 0',
      '-hls_playlist_type vod',
    `-hls_base_url ${url}/stream/`
    ], [
      '-profile:v main',
      '-b:v 2500k',
      '-bufsize 2500k',
      '-vcodec h264',
      '-acodec copy',
      '-vf drawtext=text="720":fontsize=100',
      '-hls_time 5',
      '-hls_flags single_file',
      '-hls_list_size 0',
      '-hls_playlist_type vod',
    `-hls_base_url ${url}/stream/`
    ],
    [
      '-profile:v main',
      '-preset veryfast',
      '-b:v 5000k',
      '-bufsize 5000k',
      '-vcodec h264',
      '-acodec copy',
      '-vf drawtext=text="1080":fontsize=100',
      '-hls_time 5',
      '-hls_flags single_file',
      '-hls_list_size 0',
      '-hls_playlist_type vod',
    `-hls_base_url ${url}/stream/`
    ]
  ]
}
