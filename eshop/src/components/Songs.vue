<template>
    <v-layout column>
        <v-flex xs6 offset-xs3>
            <panel title="Danh sách">
                <v-btn
                    slot="action"
                    @click="navigateTo({
                        name: 'songs-create'
                    })"
                    class="cyan accent-2"
                    light
                    absolute
                    right
                    middle
                    fab>
                    <v-icon>add</v-icon>
                </v-btn>
                <div v-for="(song, index) in songs" :key="index">
                    <v-layout>
                        <v-flex xs6>
                            <div class="song-id">
                                title: {{song.id}}
                            </div>
                            <div class="song-title">
                                title: {{song.title}}
                            </div>
                            <div class="song-artist">
                                Artist id: {{song.Artist.id}}
                            </div>
                        </v-flex>
                        <v-flex xs6>
                        </v-flex>
                    </v-layout>
                </div>
            </panel>
        </v-flex>
    </v-layout>
</template>

<script>
import SongService from '@/services/SongService'
import Panel from '@/components/Panel'
export default {
    components: {
        Panel
    },
     data () {
         return {
             songs: null
         }
     },
     async mounted () {
         const res = await SongService.getAllSong()
         this.songs = res.data
         console.log(this.songs)
     },
     methods: {
         navigateTo (route) {
             this.$router.push(route)
         }
     }
}
</script>

<style>
</style>
