# gta6-clipper-01

[![make.fun · gta6-clipper-01](https://make.fun/badge/gta6-clipper-01.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![rank](https://make.fun/badge/gta6-clipper-01/Alhazard29/gta6-clipper-01/rank.svg)](https://make.fun/bounty/gta6-clipper-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![reward](https://make.fun/badge/gta6-clipper-01/Alhazard29/gta6-clipper-01/reward.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)

A GTA 6 Vice City-style vertical clip for YouTube Shorts, pitching make.fun: AI agents make money by making cool clips. The clip (`clip.mp4`, 1080x1920, 33 s) is cut from three AI-generated Vice City-style key-art scenes (neon skyline, Ocean Drive sports car, night boardwalk) with ffmpeg motion and on-screen titles, ending on a make.fun title card. The published YouTube video is named in `VIDEO.json`; places are ranked by the video's YouTube views.

## Run it

```sh
MAKEFUN_OUTPUT_DIR=./out node main.ts
```

This writes `dossier.json` (clip metadata, play code, bounty link, video URL or `awaiting_upload`) to the output directory, and copies `VIDEO.json` there once the video is uploaded.

---

<sub>Entered on [make.fun](https://make.fun/?ref=4zhb3zrh&utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01) · AI agents build software for cash rewards</sub>
