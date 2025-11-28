"use client"

import { useState } from "react"
import type { Comment, User } from "@/lib/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Pencil, Trash2, FileText } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { EmptyState } from "@/components/empty-state"

interface CommentSectionProps {
  eventId: string
  comments: Comment[]
  currentUser: User | null
}

export function CommentSection({ eventId, comments: initialComments, currentUser }: CommentSectionProps) {
  const [comments, setComments] = useState(initialComments)
  const [newComment, setNewComment] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const { toast } = useToast()

  const handleAddComment = () => {
    if (!currentUser) {
      toast({
        title: "Faça login",
        description: "Você precisa fazer login para comentar",
        variant: "destructive",
      })
      return
    }

    if (newComment.trim()) {
      const comment: Comment = {
        id: `c${Date.now()}`,
        eventId,
        userId: currentUser.id,
        userName: currentUser.name,
        userAvatar: currentUser.avatar,
        content: newComment,
        timestamp: new Date().toISOString(),
        isAdmin: currentUser.isAdmin,
      }
      setComments([...comments, comment])
      setNewComment("")
      toast({
        title: "Comentário publicado",
        description: "Seu comentário foi adicionado com sucesso",
      })
    }
  }

  const handleEditComment = (commentId: string) => {
    const comment = comments.find((c) => c.id === commentId)
    if (comment) {
      setEditingId(commentId)
      setEditContent(comment.content)
    }
  }

  const handleSaveEdit = () => {
    if (editContent.trim()) {
      setComments(comments.map((c) => (c.id === editingId ? { ...c, content: editContent } : c)))
      setEditingId(null)
      setEditContent("")
      toast({
        title: "Comentário atualizado",
        description: "Seu comentário foi editado com sucesso",
      })
    }
  }

  const handleDeleteComment = () => {
    if (deleteId) {
      setComments(comments.filter((c) => c.id !== deleteId))
      setDeleteId(null)
      toast({
        title: "Comentário excluído",
        description: "O comentário foi excluído com sucesso",
      })
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 pb-3 border-b border-border/20">
        <FileText className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-bold">Comentários</h2>
        <span className="ml-auto text-sm text-muted-foreground">
          {comments.length} {comments.length === 1 ? "comentário" : "comentários"}
        </span>
      </div>

      {/* Add Comment */}
      {currentUser ? (
        <Card className="p-6 border-0  rounded-lg-custom">
          <div className="flex gap-4">
            <Avatar className="rounded-xs">
              <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              <Textarea
                placeholder="Escreva um comentário..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[100px] resize-none font-sans rounded-xs border border-border/30 "
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="rounded-xs font-semibold uppercase tracking-wide h-10"
                >
                  Publicar
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="p-6 text-center border-0  rounded-lg-custom">
          <p className="text-muted-foreground mb-4">Faça login para deixar um comentário</p>
          <Button className="rounded-xs">Fazer login</Button>
        </Card>
      )}

      {/* Comments List */}
      {comments.length > 0 ? (
        <div className="space-y-3">
          {comments.map((comment) => (
            <Card
              key={comment.id}
              className="p-4 border border-border/20 hover: transition-all rounded-lg-custom"
            >
              <div className="flex gap-4">
                <Avatar className="h-8 w-8 rounded-xs">
                  <AvatarImage src={comment.userAvatar || "/placeholder.svg"} alt={comment.userName} />
                  <AvatarFallback>{comment.userName[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap text-xs font-medium">
                    <span className="text-foreground font-semibold">{comment.userName}</span>
                    {comment.isAdmin && (
                      <Badge
                        variant="secondary"
                        className="text-xs rounded-xs bg-primary/10 text-primary border border-primary/20"
                      >
                        Admin
                      </Badge>
                    )}
                    <span className="text-muted-foreground">{formatTimestamp(comment.timestamp)}</span>
                  </div>

                  {editingId === comment.id ? (
                    <div className="space-y-3">
                      <Textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="min-h-[80px] resize-none font-sans rounded-xs border border-border/30"
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleSaveEdit} className="h-8 rounded-xs font-medium">
                          Guardar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingId(null)}
                          className="h-8 rounded-xs"
                        >
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-foreground leading-relaxed text-sm font-light">{comment.content}</p>
                      {currentUser && currentUser.id === comment.userId && (
                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEditComment(comment.id)}
                            className="h-7 text-xs rounded-xs"
                          >
                            <Pencil className="h-3 w-3 mr-1.5" />
                            Editar
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setDeleteId(comment.id)}
                            className="h-7 text-xs rounded-xs"
                          >
                            <Trash2 className="h-3 w-3 mr-1.5" />
                            Excluir
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState title="Sem comentários" description="Sê o primeiro a comentar sobre este evento." />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="rounded-lg-custom">
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir comentário?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O comentário será removido permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xs">Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteComment} className="rounded-xs">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
